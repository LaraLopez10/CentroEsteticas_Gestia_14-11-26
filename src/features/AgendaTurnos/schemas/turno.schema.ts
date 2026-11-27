import { ORIGENES_RESERVA } from "../constants/agenda.constants";
import type {
  ActualizarTurnoRequest, CancelarTurnoRequest, CrearTurnoRequest, ReprogramarTurnoRequest,
} from "../types/turno.types";
import {
  crearEsquema, error, numero, objeto, opcion, texto, validarRangoInstantes,
} from "./validacion";
import type { ErrorValidacion } from "./validacion";

const CAMPOS_TURNO = [
  "clienteId", "profesionalId", "servicioId", "sucursalId", "salaId",
  "fechaInicio", "fechaFin", "duracionMinutos", "precioServicio", "importeSena",
  "moneda", "observaciones",
] as const;

function validarTurno(entrada: unknown, errores: ErrorValidacion[], creacion: boolean): void {
  const dato = objeto(entrada, creacion ? [...CAMPOS_TURNO, "origen"] : CAMPOS_TURNO, errores);
  if (!dato) return;
  for (const campo of ["clienteId", "profesionalId", "servicioId", "sucursalId"]) {
    texto(dato[campo], campo, errores);
  }
  if (dato.salaId !== undefined && dato.salaId !== null) texto(dato.salaId, "salaId", errores);
  texto(dato.observaciones, "observaciones", errores, false);
  validarRangoInstantes(dato, errores, true);
  const precioValido = numero(dato.precioServicio, "precioServicio", errores);
  const senaValida = numero(dato.importeSena, "importeSena", errores);
  if (precioValido && senaValida && (dato.importeSena as number) > (dato.precioServicio as number)) {
    error(errores, "importeSena", "La seña no puede superar el precio del servicio.");
  }
  if (texto(dato.moneda, "moneda", errores) && !/^[A-Z]{3}$/.test(dato.moneda)) {
    error(errores, "moneda", "Usá un código de moneda de tres letras mayúsculas.");
  }
  if (creacion) opcion(dato.origen, ORIGENES_RESERVA, "origen", errores);
}

export const crearTurnoSchema = crearEsquema<CrearTurnoRequest>((entrada, errores) => {
  validarTurno(entrada, errores, true);
});

export const actualizarTurnoSchema = crearEsquema<ActualizarTurnoRequest>((entrada, errores) => {
  validarTurno(entrada, errores, false);
});

/** La obligatoriedad debe provenir de las reglas autorizadas del establecimiento. */
export function cancelarTurnoSchema(reglas: { motivoObligatorio: boolean }) {
  return crearEsquema<CancelarTurnoRequest>((entrada, errores) => {
    const dato = objeto(entrada, ["motivo"], errores);
    if (dato) texto(dato.motivo, "motivo", errores, reglas.motivoObligatorio);
  });
}

export const reprogramarTurnoSchema = crearEsquema<ReprogramarTurnoRequest>((entrada, errores) => {
  const dato = objeto(entrada, ["fechaInicio", "fechaFin", "duracionMinutos"], errores);
  if (dato) validarRangoInstantes(dato, errores, true);
});

