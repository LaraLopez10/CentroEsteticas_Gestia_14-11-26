import { z } from "zod";
import {
  ESTADOS_CLIENTE, TIPOS_DOCUMENTO, PREFERENCIAS_COMUNICACION,
  LIMITES_CLIENTE, PAGINACION_CLIENTES_INICIAL,
} from "../constants/clientesOpciones.constants";

export const estadoClienteSchema = z.enum(ESTADOS_CLIENTE, { error: "Seleccioná un estado permitido." });
export const tipoDocumentoSchema = z.enum(TIPOS_DOCUMENTO, { error: "Seleccioná un tipo de documento permitido." });
export const preferenciaComunicacionSchema = z.enum(PREFERENCIAS_COMUNICACION, { error: "Seleccioná un canal de comunicación permitido." });

function textoObligatorio(campo: string, maximo: number) {
  return z.string({ error: `${campo} debe ser un texto.` })
    .transform((valor) => valor.trim().replace(/\s+/gu, " "))
    .pipe(z.string().min(1, `${campo} es obligatorio.`).max(maximo, `${campo} admite hasta ${maximo} caracteres.`));
}

function textoOpcional(campo: string, maximo: number) {
  return z.string({ error: `${campo} debe ser un texto.` }).trim()
    .max(maximo, `${campo} admite hasta ${maximo} caracteres.`)
    .nullish().transform((valor) => valor === undefined || valor === null || valor === "" ? null : valor);
}

const emailSchema = textoOpcional("El correo electrónico", LIMITES_CLIENTE.email)
  .refine((valor) => valor === null || z.email().safeParse(valor).success, "Ingresá un correo electrónico válido.");
const telefonoSchema = textoOpcional("El teléfono", LIMITES_CLIENTE.telefono)
  .refine((valor) => {
    if (valor === null) return true;
    const digitos = valor.replace(/\D/gu, "");
    return /^\+?[\d\s().-]+$/u.test(valor) && digitos.length >= 7 && digitos.length <= 15;
  }, "Ingresá un teléfono válido de 7 a 15 dígitos; podés incluir el código internacional.");
const preferenciasSchema = z.array(preferenciaComunicacionSchema, { error: "Las preferencias deben ser una lista." })
  .max(PREFERENCIAS_COMUNICACION.length, "Hay demasiadas preferencias de comunicación.")
  .refine((valores) => new Set(valores).size === valores.length, "No repitas preferencias de comunicación.");

/** Ayuda UX; el servidor validará con la fecha civil del establecimiento. */
function fechaCivilActual(): string {
  const fecha = new Date();
  return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}-${String(fecha.getDate()).padStart(2, "0")}`;
}

/** Se puede aportar la fecha civil del centro; el reloj se evalúa en cada parseo. */
export function crearEsquemasCliente(opciones: { fechaActual?: string } = {}) {
  const fechaActual = opciones.fechaActual;
  if (fechaActual !== undefined && !z.iso.date().safeParse(fechaActual).success) {
    throw new Error("La fecha actual debe ser una fecha válida con formato AAAA-MM-DD.");
  }
  const fechaNacimiento = textoOpcional("La fecha de nacimiento", 10)
    .refine((valor) => valor === null || z.iso.date().safeParse(valor).success, "Ingresá una fecha de nacimiento válida con formato AAAA-MM-DD.")
    .refine((valor) => valor === null || valor <= (fechaActual ?? fechaCivilActual()), "La fecha de nacimiento no puede ser posterior a la fecha actual.");
  const campos = {
    nombre: textoObligatorio("El nombre", LIMITES_CLIENTE.nombre),
    apellido: textoObligatorio("El apellido", LIMITES_CLIENTE.apellido),
    tipoDocumento: z.string({ error: "El tipo de documento debe ser un texto." }).trim()
      .pipe(z.union([tipoDocumentoSchema, z.literal("").transform(() => null)], {
        error: "Seleccioná un tipo de documento permitido.",
      }))
      .nullish().transform((valor) => valor ?? null),
    numeroDocumento: textoOpcional("El documento", LIMITES_CLIENTE.documento),
    fechaNacimiento,
    telefono: telefonoSchema,
    email: emailSchema,
    direccion: textoOpcional("La dirección", LIMITES_CLIENTE.direccion),
    localidad: textoOpcional("La localidad", LIMITES_CLIENTE.localidad),
    provincia: textoOpcional("La provincia", LIMITES_CLIENTE.provincia),
    observaciones: textoOpcional("Las observaciones", LIMITES_CLIENTE.observaciones),
    estado: estadoClienteSchema,
    preferenciasComunicacion: preferenciasSchema,
  };
  function validarDocumento(
    dato: { tipoDocumento: string | null; numeroDocumento: string | null },
    contexto: z.RefinementCtx,
  ): void {
    if (dato.numeroDocumento !== null && dato.tipoDocumento === null) {
      contexto.addIssue({ code: "custom", path: ["tipoDocumento"], message: "Seleccioná el tipo del documento informado." });
    }
    if (dato.tipoDocumento !== null && dato.numeroDocumento === null) {
      contexto.addIssue({ code: "custom", path: ["numeroDocumento"], message: "Ingresá el número del documento seleccionado." });
    }
  }
  return {
    crearClienteSchema: z.strictObject({
      ...campos,
      estado: estadoClienteSchema.default("ACTIVO"),
      preferenciasComunicacion: preferenciasSchema.default([]),
    }, { error: "Los datos del cliente contienen campos no permitidos o no forman un objeto válido." }).superRefine(validarDocumento),
    // Actualización completa: estado y preferencias explícitos; no es un PATCH.
    actualizarClienteSchema: z.strictObject(campos, {
      error: "La actualización contiene campos no permitidos o no forma un objeto válido.",
    }).superRefine(validarDocumento),
  };
}

export const { crearClienteSchema, actualizarClienteSchema } = crearEsquemasCliente();
export const clienteFiltrosSchema = z.strictObject({
  busqueda: textoOpcional("La búsqueda", LIMITES_CLIENTE.busqueda),
  estado: estadoClienteSchema.optional(),
  tipoDocumento: tipoDocumentoSchema.optional(),
  preferenciaComunicacion: preferenciaComunicacionSchema.optional(),
  pagina: z.number({ error: "La página debe ser un número." }).int("La página debe ser entera.")
    .min(1, "La página debe ser mayor que cero.").default(PAGINACION_CLIENTES_INICIAL.pagina),
  tamanoPagina: z.number({ error: "El tamaño de página debe ser un número." }).int("El tamaño de página debe ser entero.")
    .min(1, "El tamaño de página debe ser mayor que cero.")
    .max(LIMITES_CLIENTE.tamanoPaginaMaximo, `El tamaño de página no puede superar ${LIMITES_CLIENTE.tamanoPaginaMaximo}.`)
    .default(PAGINACION_CLIENTES_INICIAL.tamanoPagina),
}, { error: "Los filtros contienen campos no permitidos o no forman un objeto válido." });
