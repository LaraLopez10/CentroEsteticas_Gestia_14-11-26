/** Catálogos internos provisionales; pendientes de acordar con C#. */
export const ESTADOS_CLIENTE = ["ACTIVO", "INACTIVO"] as const;
export const TIPOS_DOCUMENTO = ["DNI", "PASAPORTE", "CEDULA", "OTRO"] as const;
export const PREFERENCIAS_COMUNICACION = ["EMAIL", "TELEFONO", "WHATSAPP", "SMS"] as const;
export const TIPOS_FOTOGRAFIA = ["ANTES", "DESPUES", "OTRA"] as const;
export const TIPOS_MOVIMIENTO_CLIENTE = ["PAGO", "SENA", "DEVOLUCION"] as const;
export const METODOS_PAGO_CLIENTE = ["EFECTIVO", "TRANSFERENCIA", "TARJETA_DEBITO", "TARJETA_CREDITO", "OTRO"] as const;

export const LIMITES_CLIENTE = {
  nombre: 100, apellido: 100, documento: 50, email: 254, telefono: 40,
  direccion: 250, localidad: 100, provincia: 100, observaciones: 2000,
  busqueda: 200, tamanoPaginaMaximo: 100,
} as const;

export const OPCIONES_ESTADO_CLIENTE = [
  { valor: ESTADOS_CLIENTE[0], etiqueta: "Activo" },
  { valor: ESTADOS_CLIENTE[1], etiqueta: "Inactivo" },
] as const;
export const OPCIONES_TIPO_DOCUMENTO = [
  { valor: TIPOS_DOCUMENTO[0], etiqueta: "DNI" },
  { valor: TIPOS_DOCUMENTO[1], etiqueta: "Pasaporte" },
  { valor: TIPOS_DOCUMENTO[2], etiqueta: "Cédula" },
  { valor: TIPOS_DOCUMENTO[3], etiqueta: "Otro" },
] as const;
export const OPCIONES_COMUNICACION = [
  { valor: PREFERENCIAS_COMUNICACION[0], etiqueta: "Correo electrónico" },
  { valor: PREFERENCIAS_COMUNICACION[1], etiqueta: "Teléfono" },
  { valor: PREFERENCIAS_COMUNICACION[2], etiqueta: "WhatsApp" },
  { valor: PREFERENCIAS_COMUNICACION[3], etiqueta: "SMS" },
] as const;
export const OPCIONES_FOTOGRAFIA = [
  { valor: TIPOS_FOTOGRAFIA[0], etiqueta: "Antes" },
  { valor: TIPOS_FOTOGRAFIA[1], etiqueta: "Después" },
  { valor: TIPOS_FOTOGRAFIA[2], etiqueta: "Otra" },
] as const;
export const OPCIONES_FILTROS_CLIENTES = {
  estados: OPCIONES_ESTADO_CLIENTE,
  tiposDocumento: OPCIONES_TIPO_DOCUMENTO,
  preferenciasComunicacion: OPCIONES_COMUNICACION,
} as const;
export const PAGINACION_CLIENTES_INICIAL = { pagina: 1, tamanoPagina: 20 } as const;
