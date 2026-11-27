import type { CodigoMoneda, FechaHoraISO, Identificador, ImporteMonetario } from "./comunes.types";

export type EstadoTurno = "PENDIENTE" | "CONFIRMADO" | "EN_ESPERA" | "EN_ATENCION" | "FINALIZADO" | "CANCELADO" | "AUSENTE";
export type EstadoPagoTurno = "PENDIENTE" | "PARCIAL" | "PAGADO" | "REEMBOLSADO";
export type OrigenReserva = "MANUAL" | "ONLINE" | "WHATSAPP" | "TELEFONO";

/** La pertenencia al centro y los permisos deben resolverse en el servidor. */
export interface CrearTurnoRequest {
  clienteId: Identificador;
  profesionalId: Identificador;
  servicioId: Identificador;
  sucursalId: Identificador;
  salaId?: Identificador | null;
  fechaInicio: FechaHoraISO;
  fechaFin: FechaHoraISO;
  duracionMinutos: number;
  precioServicio: ImporteMonetario;
  importeSena: ImporteMonetario;
  moneda: CodigoMoneda;
  origen: OrigenReserva;
  observaciones?: string;
}

/**
 * Actualización completa de los campos editables, no un PATCH parcial.
 * Permite validar duración, fechas e importes de forma conjunta.
 * El id del turno irá separado del cuerpo de escritura.
 */
export type ActualizarTurnoRequest = Omit<CrearTurnoRequest, "origen">;

export interface CancelarTurnoRequest {
  motivo?: string;
}

export interface ReprogramarTurnoRequest {
  fechaInicio: FechaHoraISO;
  fechaFin: FechaHoraISO;
  duracionMinutos: number;
}

export interface Turno extends CrearTurnoRequest {
  id: Identificador;
  /** Solo lectura: proviene del contexto autorizado del backend. */
  centroEsteticaId: Identificador;
  estado: EstadoTurno;
  estadoPago: EstadoPagoTurno;
  motivoCancelacion?: string | null;
  fechaCreacion: FechaHoraISO;
  fechaUltimaModificacion: FechaHoraISO;
  /** Getter del modelo de lectura: precioServicio - importeSena; no persistir ni enviar. */
  get saldoPendiente(): ImporteMonetario;
}

export interface FiltrosTurnos {
  clienteId?: Identificador;
  profesionalId?: Identificador;
  servicioId?: Identificador;
  sucursalId?: Identificador;
  salaId?: Identificador;
  fechaDesde?: FechaHoraISO;
  fechaHasta?: FechaHoraISO;
  estados?: readonly EstadoTurno[];
  estadosPago?: readonly EstadoPagoTurno[];
  origenes?: readonly OrigenReserva[];
}

export interface ResumenTurnos {
  total: number;
  porEstado: Readonly<Record<EstadoTurno, number>>;
  porEstadoPago: Readonly<Record<EstadoPagoTurno, number>>;
}

