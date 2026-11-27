export { default as ClientesPage } from "./pages/ClientesPage";
export { default as ListadoClientesPage } from "./pages/ListadoClientesPage";
export { default as FormClientePage } from "./pages/FormClientePage";
export { default as SeccionClientesPage } from "./pages/SeccionClientesPage";
export {
  CLIENTES_BASE_PATH,
  CLIENTES_RUTAS,
  CLIENTES_SECCIONES_PERFIL,
} from "./constants/clientes.constants";
export type {
  ClienteId,
  CentroEsteticaId,
  ReferenciaCliente,
  ContextoCliente,
  Cliente,
  CrearClienteRequest,
  ActualizarClienteRequest,
  ClienteFormValues,
  ClienteFiltros,
  ClienteFiltrosEntrada,
  ClienteListado,
  ClienteDetalle,
  ClientesPaginados,
  EstadoCliente,
  TipoDocumento,
  PreferenciaComunicacion,
} from "./types/cliente.types";
export type { FichaEstetica, ConsentimientoCliente } from "./types/fichaEstetica.types";
export type { ClienteTurnoHistorial } from "./types/historialTurnos.types";
export type {
  TipoMovimientoCliente, MetodoPagoCliente, MovimientoFinancieroCliente,
  SaldoCliente, HistorialFinancieroCliente,
} from "./types/historialFinanciero.types";
export type { TipoFotografia, ReferenciaAlmacenamientoPrivado, ImagenTratamiento } from "./types/galeriaTratamientos.types";
export type { EstadisticasCliente } from "./types/estadisticasCliente.types";
export {
  crearEsquemasCliente, crearClienteSchema, actualizarClienteSchema,
  clienteFiltrosSchema, estadoClienteSchema, tipoDocumentoSchema,
  preferenciaComunicacionSchema,
} from "./schemas/cliente.schema";
export {
  ESTADOS_CLIENTE, TIPOS_DOCUMENTO, PREFERENCIAS_COMUNICACION,
  TIPOS_FOTOGRAFIA, TIPOS_MOVIMIENTO_CLIENTE, METODOS_PAGO_CLIENTE,
  LIMITES_CLIENTE, OPCIONES_ESTADO_CLIENTE, OPCIONES_TIPO_DOCUMENTO,
  OPCIONES_COMUNICACION, OPCIONES_FOTOGRAFIA, OPCIONES_FILTROS_CLIENTES,
  PAGINACION_CLIENTES_INICIAL,
} from "./constants/clientesOpciones.constants";
