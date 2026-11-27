import type { z } from "zod";
import type { Identificador, FechaHoraISO } from "../../AgendaTurnos/types/comunes.types";
import type {
  crearClienteSchema, actualizarClienteSchema, clienteFiltrosSchema,
  estadoClienteSchema, tipoDocumentoSchema, preferenciaComunicacionSchema,
} from "../schemas/cliente.schema";

export type ClienteId = Identificador;
export type CentroEsteticaId = Identificador;
export type EstadoCliente = z.infer<typeof estadoClienteSchema>;
export type TipoDocumento = z.infer<typeof tipoDocumentoSchema>;
export type PreferenciaComunicacion = z.infer<typeof preferenciaComunicacionSchema>;
/** Cuerpos normalizados sin identidad, tenant ni auditoría. */
export type CrearClienteRequest = z.output<typeof crearClienteSchema>;
export type ActualizarClienteRequest = z.output<typeof actualizarClienteSchema>;
export type ClienteFormValues = z.input<typeof crearClienteSchema>;
export type ClienteFiltros = z.output<typeof clienteFiltrosSchema>;
export type ClienteFiltrosEntrada = z.input<typeof clienteFiltrosSchema>;

/**
 * Referencia interna mínima. No es un DTO del backend ni una entidad completa.
 * La pertenencia proviene de una respuesta autorizada del servidor.
 * readonly evita escrituras accidentales; no proporciona seguridad multi-tenant.
 */
export interface ReferenciaCliente {
  readonly id: ClienteId;
  readonly centroEsteticaId: CentroEsteticaId;
}

/** Pertenencia de recursos dependientes, sin confundir su ID con el del cliente. */
export interface ContextoCliente {
  readonly centroEsteticaId: CentroEsteticaId;
  readonly clienteId: ClienteId;
}

/** Modelo interno de lectura; pendiente de mapeo al contrato C#. */
export type Cliente = Readonly<CrearClienteRequest & ReferenciaCliente & {
  fechaRegistro: FechaHoraISO;
  fechaUltimaActualizacion: FechaHoraISO;
}>;
export type ClienteListado = Pick<Cliente,
  "id" | "centroEsteticaId" | "nombre" | "apellido" | "telefono" | "email" |
  "fechaNacimiento" | "estado" | "fechaRegistro"
>;
/** Los datos estéticos, imágenes y finanzas tienen permisos independientes. */
export type ClienteDetalle = Cliente;
/** Paginación interna desde 1, acotada al tenant autorizado. */
export interface ClientesPaginados {
  readonly elementos: readonly ClienteListado[];
  readonly total: number;
  readonly pagina: number;
  readonly tamanoPagina: number;
}
