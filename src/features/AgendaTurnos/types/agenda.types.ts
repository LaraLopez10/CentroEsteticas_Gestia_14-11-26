import type { FechaHoraISO, FechaISO, Identificador } from "./comunes.types";
import type { BloqueoHorario } from "./disponibilidad.types";
import type { FiltrosTurnos, Turno } from "./turno.types";

export type VistaAgenda = "DIARIA" | "SEMANAL" | "MENSUAL";

/** Intervalo semiabierto [inicio, fin); dos intervalos contiguos no se superponen. */
export interface RangoFechas {
  inicio: FechaHoraISO;
  fin: FechaHoraISO;
}

export interface IntervaloHorario extends RangoFechas {
  profesionalId: Identificador;
  sucursalId: Identificador;
  salaId?: Identificador;
  estado: "DISPONIBLE" | "OCUPADO" | "BLOQUEADO";
}

/** Identifica el recurso sin replicar el modelo del profesional o de la sala. */
export interface RecursoAgenda {
  id: Identificador;
  tipo: "PROFESIONAL" | "SALA";
  entidadId: Identificador;
  sucursalId: Identificador;
  etiqueta: string;
}

/** Horarios y detalles de turnos/bloqueos se obtienen del modelo referenciado. */
export type EventoAgenda =
  | { tipo: "TURNO"; id: Identificador; turnoId: Turno["id"]; recursoId: Identificador }
  | { tipo: "BLOQUEO"; id: Identificador; bloqueoId: BloqueoHorario["id"]; recursoId: Identificador }
  | { tipo: "DISPONIBLE"; id: Identificador; intervalo: IntervaloHorario & { estado: "DISPONIBLE" }; recursoId: Identificador };

export interface FiltrosAgenda extends FiltrosTurnos {
  vista: VistaAgenda;
  fechaSeleccionada: FechaISO;
  rango?: RangoFechas;
  recursoIds?: readonly Identificador[];
}

