import type { FechaHoraISO, FechaISO, HoraLocal, Identificador } from "./comunes.types";

/** Numeración ISO: lunes = 1, domingo = 7. */
export type DiaSemana = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type TipoBloqueo = "DESCANSO" | "VACACIONES" | "AUSENCIA" | "FERIADO" | "EXTRAORDINARIO";

export interface FranjaHoraria {
  inicio: HoraLocal;
  fin: HoraLocal;
}

export interface HorarioLaboral {
  dia: DiaSemana;
  franjas: readonly FranjaHoraria[];
  /** Deben estar contenidos en una franja laboral. */
  descansos: readonly FranjaHoraria[];
}

export interface DisponibilidadProfesional {
  profesionalId: Identificador;
  sucursalId: Identificador;
  zonaHoraria: string;
  fechaDesde: FechaISO;
  fechaHasta?: FechaISO;
  horarios: readonly HorarioLaboral[];
  intervaloEntreServiciosMinutos: number;
}

export interface BloqueoHorario {
  id: Identificador;
  centroEsteticaId: Identificador;
  profesionalId: Identificador;
  sucursalId: Identificador;
  fechaInicio: FechaHoraISO;
  fechaFin: FechaHoraISO;
  tipo: TipoBloqueo;
  motivo?: string;
}

export type CrearBloqueoHorarioRequest = Omit<BloqueoHorario, "id" | "centroEsteticaId">;

/** Sustituye el horario habitual de la fecha indicada, incluidos sus descansos. */
export interface ExcepcionDisponibilidad {
  profesionalId: Identificador;
  sucursalId: Identificador;
  fecha: FechaISO;
  zonaHoraria: string;
  franjas: readonly FranjaHoraria[];
  descansos: readonly FranjaHoraria[];
  motivo?: string;
}

