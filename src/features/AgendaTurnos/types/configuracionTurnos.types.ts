import type { Identificador, ImporteMonetario } from "./comunes.types";

export type ModoConfirmacion = "AUTOMATICA" | "MANUAL";
export type TipoSena = "FIJO" | "PORCENTAJE";

export type ConfiguracionSena =
  | { obligatoria: false; tipo: TipoSena; valor: 0 }
  | { obligatoria: true; tipo: "FIJO"; valor: ImporteMonetario }
  | { obligatoria: true; tipo: "PORCENTAJE"; valor: number };

export type ConfiguracionRecordatorios =
  | { habilitados: false; anticipacionesMinutos: readonly [] }
  | { habilitados: true; anticipacionesMinutos: readonly number[] };

/** Todos los plazos se expresan en minutos; no fija políticas para todos los centros. */
export interface ConfiguracionTurnosRequest {
  reservasOnlineHabilitadas: boolean;
  modoConfirmacion: ModoConfirmacion;
  anticipacionMinimaReservaMinutos: number;
  anticipacionMaximaReservaMinutos: number;
  cancelacionesOnlineHabilitadas: boolean;
  plazoMinimoCancelacionMinutos: number;
  motivoCancelacionObligatorio: boolean;
  reprogramacionesHabilitadas: boolean;
  plazoMinimoReprogramacionMinutos: number;
  sena: ConfiguracionSena;
  intervaloEntreTurnosMinutos: number;
  intervaloAgendaMinutos: number;
  recordatorios: ConfiguracionRecordatorios;
  zonaHoraria: string;
}

export interface ConfiguracionTurnos extends ConfiguracionTurnosRequest {
  /** Identificador de lectura obtenido del backend autorizado. */
  centroEsteticaId: Identificador;
}

