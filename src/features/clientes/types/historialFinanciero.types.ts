import type {
  CodigoMoneda, FechaHoraISO, Identificador, ImporteMonetario,
} from "../../AgendaTurnos/types/comunes.types";
import type { Turno } from "../../AgendaTurnos/types/turno.types";
import type { METODOS_PAGO_CLIENTE, TIPOS_MOVIMIENTO_CLIENTE } from "../constants/clientesOpciones.constants";
import type { ContextoCliente } from "./cliente.types";

export type TipoMovimientoCliente = typeof TIPOS_MOVIMIENTO_CLIENTE[number];
export type MetodoPagoCliente = typeof METODOS_PAGO_CLIENTE[number];

/** Proyección de Caja futura; no es un cuerpo de escritura del módulo Clientes. */
export interface MovimientoFinancieroCliente extends ContextoCliente {
  readonly id: Identificador;
  readonly tipo: TipoMovimientoCliente;
  readonly metodoPago: MetodoPagoCliente;
  /** Entero seguro no negativo en unidades menores; el tipo determina el sentido. */
  readonly importe: ImporteMonetario;
  readonly moneda: CodigoMoneda;
  readonly fecha: FechaHoraISO;
  readonly turnoId: Turno["id"] | null;
  /** Permite vincular la devolución con el movimiento original. */
  readonly movimientoOrigenId: Identificador | null;
}

/**
 * Agregado calculado por el backend sobre cargos y movimientos confirmados.
 * No deducir la deuda de una página del historial ni mezclar monedas.
 * totalAbonado incluye señas una única vez y descuenta devoluciones.
 * saldoPendiente es deuda abierta no negativa; el crédito se informa aparte.
 */
export interface SaldoCliente extends ContextoCliente {
  readonly moneda: CodigoMoneda;
  readonly totalAbonado: ImporteMonetario;
  readonly saldoPendiente: ImporteMonetario;
  readonly saldoAFavor: ImporteMonetario;
  readonly fechaCalculo: FechaHoraISO;
}

export interface HistorialFinancieroCliente {
  readonly movimientos: readonly MovimientoFinancieroCliente[];
  readonly saldosPorMoneda: readonly SaldoCliente[];
}
