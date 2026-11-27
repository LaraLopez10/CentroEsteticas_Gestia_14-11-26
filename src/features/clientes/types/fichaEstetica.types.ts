import type { FechaHoraISO, Identificador } from "../../AgendaTurnos/types/comunes.types";
import type { ContextoCliente } from "./cliente.types";

/** Registro auditable; una preferencia de contacto no equivale a consentimiento. */
export interface ConsentimientoCliente extends ContextoCliente {
  readonly id: Identificador;
  readonly finalidad: string;
  readonly versionDocumento: string;
  readonly fechaOtorgamiento: FechaHoraISO;
  readonly fechaRevocacion: FechaHoraISO | null;
  /** Referencia interna privada, nunca una URL pública. */
  readonly referenciaEvidencia: string;
}

/** Datos sensibles de acceso independiente. null significa no relevado. */
export interface FichaEstetica extends ContextoCliente {
  readonly id: Identificador;
  readonly alergias: string | null;
  readonly sensibilidadCutanea: string | null;
  readonly contraindicaciones: string | null;
  readonly antecedentesRelevantes: string | null;
  readonly medicacionRelevante: string | null;
  readonly cuidadosEspeciales: string | null;
  readonly observacionesEspecialista: string | null;
  readonly consentimientos: readonly ConsentimientoCliente[];
  readonly fechaUltimaActualizacion: FechaHoraISO;
}
