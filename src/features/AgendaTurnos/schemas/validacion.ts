import { z } from "zod";
import { MILISEGUNDOS_POR_MINUTO } from "../constants/agenda.constants";

export interface ErrorValidacion {
  campo: string;
  mensaje: string;
}

/**
 * Esquema nativo Zod con refinamientos sobre la entrada completa.
 * Cada validador verifica todos los campos del contrato, sin coerción ni valores implícitos.
 * La transformación solo tipa la entrada validada; no la modifica.
 */
export function crearEsquema<T>(
  validar: (entrada: unknown, errores: ErrorValidacion[]) => void,
) {
  return z.unknown().transform((entrada, contexto): T => {
    const errores: ErrorValidacion[] = [];
    validar(entrada, errores);
    if (errores.length > 0) {
      for (const { campo, mensaje } of errores) {
        contexto.addIssue({
          code: "custom",
          path: campo ? campo.split(".").map(parte => /^\d+$/.test(parte) ? Number(parte) : parte) : [],
          message: mensaje,
        });
      }
      return z.NEVER;
    }
    return entrada as T;
  });
}

export function error(errores: ErrorValidacion[], campo: string, mensaje: string): void {
  errores.push({ campo, mensaje });
}

export function objeto(
  valor: unknown, campos: readonly string[], errores: ErrorValidacion[], ruta = "",
): Record<string, unknown> | undefined {
  if (typeof valor !== "object" || valor === null || Array.isArray(valor)) {
    error(errores, ruta, "Debe ser un objeto.");
    return undefined;
  }
  const prototipo: unknown = Object.getPrototypeOf(valor);
  if (prototipo !== null && prototipo !== Object.prototype) {
    error(errores, ruta, "Debe ser un objeto de datos simple.");
    return undefined;
  }
  const registro = valor as Record<string, unknown>;
  for (const clave of Object.keys(registro)) {
    if (!campos.includes(clave)) {
      error(errores, ruta ? `${ruta}.${clave}` : clave, "Campo no permitido.");
    }
  }
  return registro;
}

export function texto(
  valor: unknown, campo: string, errores: ErrorValidacion[], obligatorio = true,
): valor is string {
  if (valor === undefined && !obligatorio) return false;
  if (typeof valor !== "string" || (obligatorio && valor.trim().length === 0)) {
    error(errores, campo, obligatorio ? "Es obligatorio." : "Debe ser un texto.");
    return false;
  }
  return true;
}

export function numero(
  valor: unknown, campo: string, errores: ErrorValidacion[], minimo = 0, entero = true,
): valor is number {
  if (typeof valor !== "number" || !Number.isFinite(valor)
    || Math.abs(valor) > Number.MAX_SAFE_INTEGER || valor < minimo
    || (entero && !Number.isSafeInteger(valor))) {
    error(errores, campo, `Debe ser un número ${entero ? "entero seguro " : ""}mayor o igual a ${minimo}.`);
    return false;
  }
  return true;
}

export function booleano(valor: unknown, campo: string, errores: ErrorValidacion[]): valor is boolean {
  if (typeof valor !== "boolean") {
    error(errores, campo, "Debe ser un valor booleano.");
    return false;
  }
  return true;
}

export function opcion(
  valor: unknown, opciones: object, campo: string, errores: ErrorValidacion[],
): boolean {
  if (typeof valor !== "string" || !Object.hasOwn(opciones, valor)) {
    error(errores, campo, "La opción no es válida.");
    return false;
  }
  return true;
}

export function lista(valor: unknown, campo: string, errores: ErrorValidacion[]): unknown[] | undefined {
  if (!Array.isArray(valor)) {
    error(errores, campo, "Debe ser una lista.");
    return undefined;
  }
  return Array.from(valor as unknown[]);
}

export function esFechaISO(valor: unknown): valor is string {
  if (typeof valor !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
  const fecha = new Date(`${valor}T00:00:00.000Z`);
  return Number.isFinite(fecha.getTime()) && fecha.toISOString().slice(0, 10) === valor;
}

export function esFechaHoraISO(valor: unknown): valor is string {
  if (typeof valor !== "string") return false;
  const partes = /^(\d{4}-\d{2}-\d{2})T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(?:\.\d{1,3})?(Z|[+-](\d{2}):(\d{2}))$/.exec(valor);
  if (!partes || !esFechaISO(partes[1])) return false;
  if (partes[5] !== "Z") {
    const horas = Number(partes[6]);
    const minutos = Number(partes[7]);
    if (horas > 14 || minutos > 59 || (horas === 14 && minutos !== 0)) return false;
  }
  return Number.isFinite(Date.parse(valor));
}

export function validarRangoInstantes(
  dato: Record<string, unknown>, errores: ErrorValidacion[], validarDuracion = false,
): void {
  const inicioValido = esFechaHoraISO(dato.fechaInicio);
  const finValido = esFechaHoraISO(dato.fechaFin);
  if (!inicioValido) error(errores, "fechaInicio", "Ingresá una fecha ISO 8601 con zona o desplazamiento horario.");
  if (!finValido) error(errores, "fechaFin", "Ingresá una fecha ISO 8601 con zona o desplazamiento horario.");
  if (inicioValido && finValido) {
    const diferencia = Date.parse(dato.fechaFin as string) - Date.parse(dato.fechaInicio as string);
    if (diferencia <= 0) error(errores, "fechaFin", "La finalización debe ser posterior al inicio.");
    if (validarDuracion && typeof dato.duracionMinutos === "number"
      && diferencia !== dato.duracionMinutos * MILISEGUNDOS_POR_MINUTO) {
      error(errores, "duracionMinutos", "La duración debe coincidir con el rango horario.");
    }
  }
  if (validarDuracion) numero(dato.duracionMinutos, "duracionMinutos", errores, 1);
}

export function zonaHoraria(valor: unknown, campo: string, errores: ErrorValidacion[]): void {
  if (!texto(valor, campo, errores)) return;
  // Rechaza offsets sueltos: se necesita una zona del establecimiento con reglas de horario.
  if (valor !== "UTC" && !/^[A-Za-z_]+(?:\/[A-Za-z0-9_+-]+)+$/.test(valor)) {
    error(errores, campo, "Ingresá una zona horaria IANA.");
    return;
  }
  try {
    new Intl.DateTimeFormat("es", { timeZone: valor }).format(0);
  } catch {
    error(errores, campo, "La zona horaria IANA no es válida.");
  }
}
