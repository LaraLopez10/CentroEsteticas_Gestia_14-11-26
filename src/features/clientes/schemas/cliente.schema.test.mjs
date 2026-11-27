import assert from "node:assert/strict";
import { test } from "node:test";
import { createServer } from "vite";

const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
let esquemas;
try {
  esquemas = await server.ssrLoadModule("/src/features/clientes/schemas/cliente.schema.ts");
} finally {
  await server.close();
}
const { crearClienteSchema, actualizarClienteSchema } = esquemas.crearEsquemasCliente({ fechaActual: "2026-11-27" });
const minimo = { nombre: " Ana   María ", apellido: " Pérez " };

function invalido(schema, entrada) {
  const resultado = schema.safeParse(entrada);
  assert.equal(resultado.success, false);
  assert.ok(resultado.error.issues.every((issue) => issue.message.length > 0));
}

test("normaliza nombres y opcionales, sin perder ceros del documento ni formato telefónico", () => {
  const cliente = crearClienteSchema.parse(minimo);
  assert.equal(cliente.nombre, "Ana María");
  assert.equal(cliente.apellido, "Pérez");
  assert.equal(cliente.estado, "ACTIVO");
  assert.deepEqual(cliente.preferenciasComunicacion, []);
  for (const campo of ["tipoDocumento", "numeroDocumento", "fechaNacimiento", "telefono", "email", "direccion", "localidad", "provincia", "observaciones"]) {
    assert.equal(cliente[campo], null, campo);
    for (const valor of [null, undefined, "", "   "]) {
      assert.equal(crearClienteSchema.parse({ ...minimo, [campo]: valor })[campo], null);
    }
  }
  const completo = crearClienteSchema.parse({
    ...minimo, tipoDocumento: "PASAPORTE", numeroDocumento: " 001AB ",
    telefono: " +54 (11) 5555-1234 ", email: " ana@example.com ",
    preferenciasComunicacion: ["EMAIL", "WHATSAPP"],
  });
  assert.equal(completo.numeroDocumento, "001AB");
  assert.equal(completo.telefono, "+54 (11) 5555-1234");
  assert.equal(completo.email, "ana@example.com");
});

test("rechaza obligatorios vacíos, formatos, tipos y longitudes inválidos", () => {
  for (const campo of ["nombre", "apellido"]) {
    for (const valor of [undefined, null, "", " \n\t ", 123, "a".repeat(101)]) {
      invalido(crearClienteSchema, { ...minimo, [campo]: valor });
    }
  }
  for (const entrada of [
    { email: "sin-arroba" }, { email: 42 }, { telefono: "123" },
    { telefono: "++541155551234" }, { telefono: "54abc1155551234" },
    { telefono: "1234567890123456" }, { estado: "BLOQUEADO" },
    { preferenciasComunicacion: ["FAX"] }, { preferenciasComunicacion: ["EMAIL", "EMAIL"] },
    { preferenciasComunicacion: null }, { observaciones: "a".repeat(2001) },
    { tipoDocumento: "DNI" }, { numeroDocumento: "12345678" },
    { tipoDocumento: "INVENTADO", numeroDocumento: "123" },
  ]) invalido(crearClienteSchema, { ...minimo, ...entrada });
  assert.equal(crearClienteSchema.safeParse({ ...minimo, observaciones: "a".repeat(2000) }).success, true);
});

test("fecha civil: valida calendario, años bisiestos y límite inclusivo de hoy", () => {
  for (const fechaNacimiento of ["2026-11-27", "2024-02-29", "1990-01-01"]) {
    assert.equal(crearClienteSchema.safeParse({ ...minimo, fechaNacimiento }).success, true);
  }
  for (const fechaNacimiento of ["2026-11-28", "2025-02-29", "2026-02-30", "27/11/2026", "2026-11-27T00:00:00Z"]) {
    invalido(crearClienteSchema, { ...minimo, fechaNacimiento });
  }
  assert.throws(() => esquemas.crearEsquemasCliente({ fechaActual: "2026-02-30" }));
});

test("rechaza campos de servidor y tenant en creación, actualización y filtros", () => {
  const actualizacion = crearClienteSchema.parse(minimo);
  for (const campo of ["id", "centroEsteticaId", "fechaRegistro", "fechaUltimaActualizacion", "saldoPendiente", "fichaEstetica"]) {
    invalido(crearClienteSchema, { ...minimo, [campo]: "ajeno" });
    invalido(actualizarClienteSchema, { ...actualizacion, [campo]: "ajeno" });
  }
  invalido(esquemas.clienteFiltrosSchema, { centroEsteticaId: "ajeno" });
});

test("actualización completa requiere nombre, apellido, estado y preferencias explícitos", () => {
  const completo = crearClienteSchema.parse(minimo);
  assert.equal(actualizarClienteSchema.safeParse(completo).success, true);
  for (const campo of ["nombre", "apellido", "estado", "preferenciasComunicacion"]) {
    const entrada = { ...completo };
    delete entrada[campo];
    invalido(actualizarClienteSchema, entrada);
  }
  invalido(actualizarClienteSchema, { estado: "INACTIVO" });
  assert.equal(actualizarClienteSchema.parse({ ...completo, estado: "INACTIVO", email: " " }).email, null);
});

test("filtros: normalización, catálogos y paginación acotada", () => {
  assert.deepEqual(esquemas.clienteFiltrosSchema.parse({}), { busqueda: null, pagina: 1, tamanoPagina: 20 });
  assert.equal(esquemas.clienteFiltrosSchema.parse({ busqueda: " Ana " }).busqueda, "Ana");
  for (const entrada of [
    { pagina: 0 }, { pagina: 1.5 }, { pagina: "1" }, { tamanoPagina: 101 },
    { tamanoPagina: 0 }, { estado: "OTRO" }, { preferenciaComunicacion: "FAX" },
  ]) invalido(esquemas.clienteFiltrosSchema, entrada);
});
