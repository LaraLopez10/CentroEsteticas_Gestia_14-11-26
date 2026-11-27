import type { FechaHoraISO } from "../../AgendaTurnos/types/comunes.types";
import type { ContextoCliente } from "./cliente.types";
import type { SaldoCliente } from "./historialFinanciero.types";
import type { ClienteTurnoHistorial } from "./historialTurnos.types";

/** Agregado autorizado del backend; nunca a partir de una página del listado. */
export interface EstadisticasCliente extends ContextoCliente {
  readonly totalTurnos: number;
  readonly turnosRealizados: number;
  readonly turnosCancelados: number;
  readonly inasistencias: number;
  readonly saldosPorMoneda: readonly SaldoCliente[];
  readonly ultimaVisita: FechaHoraISO | null;
  readonly proximoTurno: ClienteTurnoHistorial | null;
  readonly servicioMasFrecuente: ClienteTurnoHistorial["servicio"] | null;
  readonly profesionalMasFrecuente: ClienteTurnoHistorial["profesional"] | null;
  readonly fechaCalculo: FechaHoraISO;
}
