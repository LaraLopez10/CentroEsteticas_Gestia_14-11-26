import { DIAS_SEMANA, TIPOS_BLOQUEO } from "../constants/agenda.constants";
import type {
  CrearBloqueoHorarioRequest, DisponibilidadProfesional, ExcepcionDisponibilidad, FranjaHoraria, HorarioLaboral,
} from "../types/disponibilidad.types";
import {
  crearEsquema, error, esFechaISO, lista, numero, objeto, opcion, texto,
  validarRangoInstantes, zonaHoraria,
} from "./validacion";
import type { ErrorValidacion } from "./validacion";

function validarFranja(entrada: unknown, errores: ErrorValidacion[], ruta: string): void {
  const dato = objeto(entrada, ["inicio", "fin"], errores, ruta);
  if (!dato) return;
  const horaValida = (valor: unknown): valor is string =>
    typeof valor === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(valor);
  const inicioValido = horaValida(dato.inicio);
  const finValido = horaValida(dato.fin);
  const campoInicio = ruta ? `${ruta}.inicio` : "inicio";
  const campoFin = ruta ? `${ruta}.fin` : "fin";
  if (!inicioValido) error(errores, campoInicio, "Ingresá una hora válida HH:mm.");
  if (!finValido) error(errores, campoFin, "Ingresá una hora válida HH:mm.");
  if (inicioValido && finValido && (dato.inicio as string) >= (dato.fin as string)) {
    error(errores, campoFin, "El final debe ser posterior al inicio; dividí las franjas que cruzan medianoche.");
  }
}

export const franjaHorariaSchema = crearEsquema<FranjaHoraria>((entrada, errores) => {
  validarFranja(entrada, errores, "");
});

function validarFranjas(
  valor: unknown, errores: ErrorValidacion[], ruta: string,
): FranjaHoraria[] | undefined {
  const elementos = lista(valor, ruta, errores);
  if (!elementos) return undefined;
  const franjas: FranjaHoraria[] = [];
  elementos.forEach((entrada, index) => {
    const cantidadErrores = errores.length;
    validarFranja(entrada, errores, `${ruta}.${index}`);
    if (errores.length === cantidadErrores) franjas.push(entrada as FranjaHoraria);
  });
  // Ordenar una copia evita mutar la entrada y permite comprobar listas desordenadas.
  const ordenadas = [...franjas].sort((a, b) => a.inicio.localeCompare(b.inicio));
  for (let index = 1; index < ordenadas.length; index++) {
    if (ordenadas[index].inicio < ordenadas[index - 1].fin) {
      error(errores, ruta, "Las franjas del mismo día no pueden superponerse.");
    }
  }
  return franjas;
}

function validarJornada(
  dato: Record<string, unknown>, errores: ErrorValidacion[], ruta: string, permiteCierre: boolean,
): void {
  const campoFranjas = ruta ? `${ruta}.franjas` : "franjas";
  const campoDescansos = ruta ? `${ruta}.descansos` : "descansos";
  const franjas = validarFranjas(dato.franjas, errores, campoFranjas);
  const descansos = validarFranjas(dato.descansos, errores, campoDescansos);
  if (franjas && franjas.length === 0 && !permiteCierre) {
    error(errores, campoFranjas, "Definí al menos una franja laboral.");
  }
  if (franjas && descansos) {
    for (const descanso of descansos) {
      if (!franjas.some(franja => descanso.inicio >= franja.inicio && descanso.fin <= franja.fin)) {
        error(errores, campoDescansos, "Cada descanso debe estar contenido en una franja laboral.");
      }
    }
  }
}

function validarHorario(entrada: unknown, errores: ErrorValidacion[], ruta: string): void {
  const dato = objeto(entrada, ["dia", "franjas", "descansos"], errores, ruta);
  if (!dato) return;
  if (typeof dato.dia !== "number" || !Number.isInteger(dato.dia) || !Object.hasOwn(DIAS_SEMANA, dato.dia)) {
    error(errores, ruta ? `${ruta}.dia` : "dia", "Seleccioná un día laboral válido (1 a 7).");
  }
  validarJornada(dato, errores, ruta, false);
}

export const horarioLaboralSchema = crearEsquema<HorarioLaboral>((entrada, errores) => {
  validarHorario(entrada, errores, "");
});

export const disponibilidadProfesionalSchema = crearEsquema<DisponibilidadProfesional>((entrada, errores) => {
  const dato = objeto(entrada, [
    "profesionalId", "sucursalId", "zonaHoraria", "fechaDesde", "fechaHasta",
    "horarios", "intervaloEntreServiciosMinutos",
  ], errores);
  if (!dato) return;
  texto(dato.profesionalId, "profesionalId", errores);
  texto(dato.sucursalId, "sucursalId", errores);
  zonaHoraria(dato.zonaHoraria, "zonaHoraria", errores);
  numero(dato.intervaloEntreServiciosMinutos, "intervaloEntreServiciosMinutos", errores);
  if (!esFechaISO(dato.fechaDesde)) error(errores, "fechaDesde", "Ingresá una fecha válida YYYY-MM-DD.");
  if (dato.fechaHasta !== undefined) {
    if (!esFechaISO(dato.fechaHasta)) error(errores, "fechaHasta", "Ingresá una fecha válida YYYY-MM-DD.");
    else if (esFechaISO(dato.fechaDesde) && dato.fechaHasta < dato.fechaDesde) {
      error(errores, "fechaHasta", "La fecha final debe ser mayor o igual a la inicial.");
    }
  }
  const horarios = lista(dato.horarios, "horarios", errores);
  if (horarios) {
    const dias = new Set<number>();
    horarios.forEach((horario, index) => {
      validarHorario(horario, errores, `horarios.${index}`);
      if (typeof horario === "object" && horario !== null && "dia" in horario && typeof horario.dia === "number") {
        if (dias.has(horario.dia)) error(errores, `horarios.${index}.dia`, "Agrupá todas las franjas del día en una única jornada.");
        dias.add(horario.dia);
      }
    });
  }
});

/** Las reglas de obligatoriedad del motivo deben aportarse explícitamente. */
export function bloqueoHorarioSchema(reglas: { motivoObligatorio: boolean }) {
  return crearEsquema<CrearBloqueoHorarioRequest>((entrada, errores) => {
    const dato = objeto(entrada, [
      "profesionalId", "sucursalId", "fechaInicio", "fechaFin", "tipo", "motivo",
    ], errores);
    if (!dato) return;
    texto(dato.profesionalId, "profesionalId", errores);
    texto(dato.sucursalId, "sucursalId", errores);
    opcion(dato.tipo, TIPOS_BLOQUEO, "tipo", errores);
    texto(dato.motivo, "motivo", errores, reglas.motivoObligatorio);
    validarRangoInstantes(dato, errores);
  });
}

export const excepcionDisponibilidadSchema = crearEsquema<ExcepcionDisponibilidad>((entrada, errores) => {
  const dato = objeto(entrada, [
    "profesionalId", "sucursalId", "fecha", "zonaHoraria", "franjas", "descansos", "motivo",
  ], errores);
  if (!dato) return;
  texto(dato.profesionalId, "profesionalId", errores);
  texto(dato.sucursalId, "sucursalId", errores);
  texto(dato.motivo, "motivo", errores, false);
  zonaHoraria(dato.zonaHoraria, "zonaHoraria", errores);
  if (!esFechaISO(dato.fecha)) error(errores, "fecha", "Ingresá una fecha válida YYYY-MM-DD.");
  validarJornada(dato, errores, "", true);
});

