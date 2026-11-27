export const CLIENTES_BASE_PATH = "/clientes";

/** Rutas de interfaz; no representan endpoints ni contratos del backend. */
export const CLIENTES_RUTAS = {
  nuevo: "nuevo",
  cumpleanos: "cumpleanos",
  cliente: ":clienteId",
  editar: "editar",
} as const;

export const CLIENTES_SECCIONES_PERFIL = [
  { path: "", title: "Perfil del cliente", description: "Datos individuales del cliente." },
  { path: "turnos", title: "Historial de turnos", description: "Turnos asociados al cliente." },
  { path: "ficha-estetica", title: "Ficha estética", description: "Información estética del cliente." },
  { path: "pagos", title: "Pagos y señas", description: "Historial de pagos y señas del cliente." },
  { path: "galeria", title: "Galería de tratamientos", description: "Imágenes de los tratamientos del cliente." },
  { path: "estadisticas", title: "Estadísticas individuales", description: "Indicadores de actividad del cliente." },
  { path: "estado", title: "Estado del cliente", description: "Estado del cliente dentro del establecimiento." },
] as const;
