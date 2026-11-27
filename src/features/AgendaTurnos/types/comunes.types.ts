/**
 * Modelos internos provisionales; no constituyen el contrato definitivo del backend C#.
 * Los identificadores son opacos. No se duplican las entidades de otros módulos.
 */
export type Identificador = string;
/** Fecha civil ISO 8601 YYYY-MM-DD en la zona horaria del establecimiento. */
export type FechaISO = string;
/** Instante ISO 8601 con Z o desplazamiento explícito, nunca una fecha local ambigua. */
export type FechaHoraISO = string;
/** Hora civil HH:mm en la zona horaria del establecimiento. */
export type HoraLocal = string;
/** Entero seguro en la unidad menor de la moneda (centavos para ARS). */
export type ImporteMonetario = number;
/** Código de moneda de tres letras; su soporte real se acordará con el backend. */
export type CodigoMoneda = string;
