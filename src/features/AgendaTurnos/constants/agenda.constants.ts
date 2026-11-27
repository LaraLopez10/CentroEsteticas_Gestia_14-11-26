import type { VistaAgenda } from "../types/agenda.types";
import type { ConfiguracionTurnosRequest, ModoConfirmacion, TipoSena } from "../types/configuracionTurnos.types";
import type { DiaSemana, TipoBloqueo } from "../types/disponibilidad.types";
import type { EstadoPagoTurno, OrigenReserva } from "../types/turno.types";
import { ESTADOS_TURNO } from "./estadosTurno";

export const AGENDA_TURNOS_BASE_PATH = "/turnos";
export const AGENDA_TURNOS_SECCIONES = [
  { id: "agenda", label: "Agenda" },
  { id: "listado", label: "Turnos" },
  { id: "disponibilidad", label: "Disponibilidad" },
  { id: "configuracion", label: "Configuración de turnos" },
] as const;

export const VISTAS_AGENDA = {
  DIARIA: "Día", SEMANAL: "Semana", MENSUAL: "Mes",
} as const satisfies Record<VistaAgenda, string>;

export const DIAS_SEMANA = {
  1: "Lunes", 2: "Martes", 3: "Miércoles", 4: "Jueves",
  5: "Viernes", 6: "Sábado", 7: "Domingo",
} as const satisfies Record<DiaSemana, string>;

export const TIPOS_BLOQUEO = {
  DESCANSO: "Descanso", VACACIONES: "Vacaciones", AUSENCIA: "Ausencia",
  FERIADO: "Feriado", EXTRAORDINARIO: "Bloqueo extraordinario",
} as const satisfies Record<TipoBloqueo, string>;

export const ORIGENES_RESERVA = {
  MANUAL: "Manual", ONLINE: "Online", WHATSAPP: "WhatsApp", TELEFONO: "Teléfono",
} as const satisfies Record<OrigenReserva, string>;

export const ESTADOS_PAGO_TURNO = {
  PENDIENTE: "Pendiente", PARCIAL: "Parcial", PAGADO: "Pagado", REEMBOLSADO: "Reembolsado",
} as const satisfies Record<EstadoPagoTurno, string>;

export const MODOS_CONFIRMACION = {
  AUTOMATICA: "Automática", MANUAL: "Manual",
} as const satisfies Record<ModoConfirmacion, string>;

export const TIPOS_SENA = {
  FIJO: "Importe fijo", PORCENTAJE: "Porcentaje",
} as const satisfies Record<TipoSena, string>;

/** Las etiquetas de estado se derivan de sus metadatos, sin repetirlas. */
export const OPCIONES_FILTROS_TURNOS = {
  estados: Object.values(ESTADOS_TURNO).map(({ id, etiqueta }) => ({ valor: id, etiqueta })),
  estadosPago: Object.entries(ESTADOS_PAGO_TURNO).map(([valor, etiqueta]) => ({ valor, etiqueta })),
  origenes: Object.entries(ORIGENES_RESERVA).map(([valor, etiqueta]) => ({ valor, etiqueta })),
};

export const MILISEGUNDOS_POR_MINUTO = 60_000;
export const MINUTOS_POR_HORA = 60;
export const MINUTOS_POR_DIA = 24 * MINUTOS_POR_HORA;
export const PORCENTAJE_MAXIMO = 100;
export const INTERVALOS_AGENDA_MINUTOS = [5, 10, 15, 20, 30, 60] as const;

/**
 * Propuesta inicial editable, nunca una política global.
 * La zona horaria es obligatoria y debe aportarla cada establecimiento.
 * El intervalo de agenda es positivo; la separación entre turnos puede ser cero.
 */
export const CONFIGURACION_TURNOS_INICIAL = {
  reservasOnlineHabilitadas: false,
  modoConfirmacion: "MANUAL",
  anticipacionMinimaReservaMinutos: 0,
  anticipacionMaximaReservaMinutos: 30 * MINUTOS_POR_DIA,
  cancelacionesOnlineHabilitadas: false,
  plazoMinimoCancelacionMinutos: 0,
  motivoCancelacionObligatorio: false,
  reprogramacionesHabilitadas: false,
  plazoMinimoReprogramacionMinutos: 0,
  sena: { obligatoria: false, tipo: "FIJO", valor: 0 },
  intervaloEntreTurnosMinutos: 0,
  intervaloAgendaMinutos: 15,
  recordatorios: { habilitados: false, anticipacionesMinutos: [] },
} as const satisfies Omit<ConfiguracionTurnosRequest, "zonaHoraria">;

