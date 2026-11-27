import type { FechaHoraISO, Identificador } from "../../AgendaTurnos/types/comunes.types";
import type { Turno } from "../../AgendaTurnos/types/turno.types";
import type { TIPOS_FOTOGRAFIA } from "../constants/clientesOpciones.constants";
import type { ContextoCliente } from "./cliente.types";
import type { ConsentimientoCliente } from "./fichaEstetica.types";

export type TipoFotografia = typeof TIPOS_FOTOGRAFIA[number];

/** Bucket privado y clave del objeto; sin credenciales ni URL persistida. */
export interface ReferenciaAlmacenamientoPrivado {
  readonly bucket: string;
  readonly rutaObjeto: string;
}

/** Al menos una asociación; las pertenencias se comprobarán en el servidor. */
type AsociacionTratamiento =
  | { readonly turnoId: Turno["id"]; readonly tratamientoId: Identificador | null }
  | { readonly turnoId: null; readonly tratamientoId: Identificador };

export type ImagenTratamiento = Readonly<ContextoCliente & AsociacionTratamiento & {
  id: Identificador;
  almacenamiento: ReferenciaAlmacenamientoPrivado;
  tipo: TipoFotografia;
  fecha: FechaHoraISO;
  descripcion: string | null;
  consentimientoId: ConsentimientoCliente["id"];
}>;
