import type { ComponentProps } from "react";
import type Badge from "../../../components/ui/Badge";
import type { EstadoTurno } from "../types/turno.types";

interface MetadatosEstadoTurno {
  id: EstadoTurno;
  etiqueta: string;
  descripcion: string;
  variante: NonNullable<ComponentProps<typeof Badge>["variant"]>;
  /** Propuesta de interfaz; la autorización de cada transición corresponde al backend. */
  transicionesPermitidas: readonly EstadoTurno[];
}

export const ESTADOS_TURNO = {
  PENDIENTE: {
    id: "PENDIENTE", etiqueta: "Pendiente", descripcion: "Reserva pendiente de confirmación.",
    variante: "warning", transicionesPermitidas: ["CONFIRMADO", "CANCELADO"],
  },
  CONFIRMADO: {
    id: "CONFIRMADO", etiqueta: "Confirmado", descripcion: "Reserva confirmada.",
    variante: "info", transicionesPermitidas: ["EN_ESPERA", "EN_ATENCION", "CANCELADO", "AUSENTE"],
  },
  EN_ESPERA: {
    id: "EN_ESPERA", etiqueta: "En espera", descripcion: "El cliente espera ser atendido.",
    variante: "primary", transicionesPermitidas: ["EN_ATENCION", "CANCELADO", "AUSENTE"],
  },
  EN_ATENCION: {
    id: "EN_ATENCION", etiqueta: "En atención", descripcion: "El servicio está en curso.",
    variante: "info", transicionesPermitidas: ["FINALIZADO", "CANCELADO"],
  },
  FINALIZADO: {
    id: "FINALIZADO", etiqueta: "Finalizado", descripcion: "El servicio ha finalizado.",
    variante: "success", transicionesPermitidas: [],
  },
  CANCELADO: {
    id: "CANCELADO", etiqueta: "Cancelado", descripcion: "La reserva fue cancelada.",
    variante: "danger", transicionesPermitidas: [],
  },
  AUSENTE: {
    id: "AUSENTE", etiqueta: "Ausente", descripcion: "El cliente no se presentó.",
    variante: "neutral", transicionesPermitidas: [],
  },
} as const satisfies Record<EstadoTurno, MetadatosEstadoTurno>;

