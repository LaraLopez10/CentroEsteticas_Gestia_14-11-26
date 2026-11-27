import type { Turno } from "../../AgendaTurnos/types/turno.types";

/** Proyección de lectura; los campos operativos y estados pertenecen a Turnos. */
export type ClienteTurnoHistorial = Readonly<Pick<Turno,
  "id" | "centroEsteticaId" | "clienteId" | "fechaInicio" | "fechaFin" |
  "duracionMinutos" | "precioServicio" | "moneda" | "estado"
> & {
  servicio: Readonly<{ id: Turno["servicioId"]; nombre: string }>;
  profesional: Readonly<{ id: Turno["profesionalId"]; nombre: string }>;
  sucursal: Readonly<{ id: Turno["sucursalId"]; nombre: string }>;
}>;
