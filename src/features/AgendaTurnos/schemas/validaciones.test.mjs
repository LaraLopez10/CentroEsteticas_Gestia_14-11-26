import assert from "node:assert/strict";
import { test } from "node:test";
import { createServer } from "vite";

// Casos de prueba locales; no se exportan fixtures ni se cargan en la aplicación.
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
let turnos;
let disponibilidad;
let configuracion;
let constantes;
try {
  turnos = await server.ssrLoadModule("/src/features/AgendaTurnos/schemas/turno.schema.ts");
  disponibilidad = await server.ssrLoadModule("/src/features/AgendaTurnos/schemas/disponibilidad.schema.ts");
  configuracion = await server.ssrLoadModule("/src/features/AgendaTurnos/schemas/configuracionTurnos.schema.ts");
  constantes = await server.ssrLoadModule("/src/features/AgendaTurnos/constants/agenda.constants.ts");
} finally {
  await server.close();
}

const turnoValido = () => ({
  clienteId: "cliente", profesionalId: "profesional", servicioId: "servicio",
  sucursalId: "sucursal", fechaInicio: "2026-11-26T10:00:00-03:00",
  fechaFin: "2026-11-26T11:00:00-03:00", duracionMinutos: 60,
  precioServicio: 10000, importeSena: 2000, moneda: "ARS", origen: "MANUAL",
});
const franja = (inicio, fin) => ({ inicio, fin });
const disponibilidadValida = () => ({
  profesionalId: "profesional", sucursalId: "sucursal",
  zonaHoraria: "America/Argentina/Buenos_Aires", fechaDesde: "2026-11-26",
  horarios: [{ dia: 1, franjas: [franja("09:00", "13:00"), franja("14:00", "18:00")], descansos: [] }],
  intervaloEntreServiciosMinutos: 0,
});
const configuracionValida = () => structuredClone({
  ...constantes.CONFIGURACION_TURNOS_INICIAL,
  zonaHoraria: "America/Argentina/Buenos_Aires",
});
function comprobar(schema, entrada, esperado, nombre) {
  const resultado = schema.safeParse(entrada);
  assert.equal(resultado.success, esperado, nombre);
  if (!esperado) {
    assert.ok(resultado.error.issues.length > 0, nombre);
    assert.ok(resultado.error.issues.every(error => Array.isArray(error.path) && error.message.length > 0));
  }
}

test("creación: campos obligatorios, enums, dinero entero y datos de lectura rechazados", () => {
  const schema = turnos.crearTurnoSchema;
  comprobar(schema, turnoValido(), true, "turno válido");
  for (const campo of Object.keys(turnoValido())) {
    const entrada = turnoValido();
    delete entrada[campo];
    comprobar(schema, entrada, false, campo + " obligatorio");
  }
  for (const entrada of [
    null, [], new Date(),
    { ...turnoValido(), clienteId: "   " },
    { ...turnoValido(), profesionalId: 123 },
    { ...turnoValido(), precioServicio: -1 },
    { ...turnoValido(), precioServicio: 0.1 + 0.2 },
    { ...turnoValido(), precioServicio: Number.MAX_SAFE_INTEGER + 1 },
    { ...turnoValido(), importeSena: -1 },
    { ...turnoValido(), importeSena: 10001 },
    { ...turnoValido(), importeSena: NaN },
    { ...turnoValido(), precioServicio: Infinity },
    { ...turnoValido(), origen: "OTRO" },
    { ...turnoValido(), moneda: "ars" },
    { ...turnoValido(), centroEsteticaId: "otro-centro" },
    { ...turnoValido(), saldoPendiente: 8000 },
    { ...turnoValido(), estado: "CONFIRMADO" },
  ]) comprobar(schema, entrada, false, "entrada inválida");
  comprobar(schema, { ...turnoValido(), precioServicio: 0, importeSena: 0, salaId: null }, true, "servicio gratuito");
});

test("fechas: calendario real, offset, duración y orden cronológico", () => {
  for (const fechaInicio of [
    "", "2026-11-26T10:00:00", "2026-02-30T10:00:00Z",
    "2026-11-26T24:00:00Z", "2026-11-26T10:00:00+14:01",
    "2026-11-26T10:00:00+15:00",
  ]) comprobar(turnos.crearTurnoSchema, { ...turnoValido(), fechaInicio }, false, fechaInicio);
  for (const valores of [
    { fechaFin: "2026-11-26T09:00:00-03:00" },
    { fechaFin: turnoValido().fechaInicio },
    { duracionMinutos: 0 }, { duracionMinutos: 59 }, { duracionMinutos: 1.5 },
  ]) comprobar(turnos.crearTurnoSchema, { ...turnoValido(), ...valores }, false, "rango o duración inválida");
  comprobar(turnos.crearTurnoSchema, {
    ...turnoValido(), fechaFin: "2026-11-26T14:00:00Z",
  }, true, "comparación de instantes con offsets diferentes");
});

test("actualización completa, cancelación condicionada y reprogramación", () => {
  const { origen, ...actualizacion } = turnoValido();
  assert.equal(origen, "MANUAL");
  comprobar(turnos.actualizarTurnoSchema, actualizacion, true, "actualización completa");
  comprobar(turnos.actualizarTurnoSchema, { precioServicio: 100 }, false, "parche insuficiente");
  comprobar(turnos.actualizarTurnoSchema, turnoValido(), false, "origen no editable");
  comprobar(turnos.cancelarTurnoSchema({ motivoObligatorio: true }), {}, false, "motivo requerido");
  comprobar(turnos.cancelarTurnoSchema({ motivoObligatorio: true }), { motivo: "   " }, false, "motivo vacío");
  comprobar(turnos.cancelarTurnoSchema({ motivoObligatorio: true }), { motivo: "Solicitud del cliente" }, true, "motivo válido");
  comprobar(turnos.cancelarTurnoSchema({ motivoObligatorio: false }), {}, true, "motivo opcional");
  comprobar(turnos.cancelarTurnoSchema({ motivoObligatorio: false }), { motivo: 4 }, false, "motivo inválido");
  comprobar(turnos.cancelarTurnoSchema({ motivoObligatorio: false }), new Date(), false, "objeto no plano");
  const { fechaInicio, fechaFin, duracionMinutos } = turnoValido();
  comprobar(turnos.reprogramarTurnoSchema, { fechaInicio, fechaFin, duracionMinutos }, true, "reprogramación válida");
  comprobar(turnos.reprogramarTurnoSchema, { fechaInicio, fechaFin, duracionMinutos: 20 }, false, "duración inconsistente");
});

test("disponibilidad: franjas desordenadas, contiguas, superpuestas y descansos", () => {
  const schema = disponibilidad.disponibilidadProfesionalSchema;
  comprobar(schema, disponibilidadValida(), true, "disponibilidad válida");
  for (const horarios of [
    [{ dia: 0, franjas: [franja("09:00", "10:00")], descansos: [] }],
    [{ dia: 8, franjas: [franja("09:00", "10:00")], descansos: [] }],
    [{ dia: 1, franjas: [], descansos: [] }],
    [{ dia: 1, franjas: [franja("10:00", "09:00")], descansos: [] }],
    [{ dia: 1, franjas: [franja("09:00", "13:00"), franja("12:00", "14:00")], descansos: [] }],
    [{ dia: 1, franjas: [franja("09:00", "13:00")], descansos: [franja("08:00", "10:00")] }],
    [{ dia: 1, franjas: [franja("09:00", "13:00")], descansos: [franja("10:00", "11:00"), franja("10:30", "12:00")] }],
    [disponibilidadValida().horarios[0], disponibilidadValida().horarios[0]],
    Array(1),
  ]) comprobar(schema, { ...disponibilidadValida(), horarios }, false, "jornada inválida");
  for (const franjas of [
    [franja("10:00", "11:00"), franja("09:00", "10:00")],
    [franja("09:00", "13:00"), franja("14:00", "18:00")],
  ]) comprobar(schema, {
    ...disponibilidadValida(), horarios: [{ dia: 1, franjas, descansos: [franja("10:00", "10:15")] }],
  }, true, "franjas válidas y descanso contenido");
  for (const cambio of [
    { profesionalId: "" }, { sucursalId: "" }, { fechaDesde: "2026-02-30" },
    { fechaHasta: "2026-01-01" }, { zonaHoraria: "Zona/Inexistente" },
    { intervaloEntreServiciosMinutos: -1 },
  ]) comprobar(schema, { ...disponibilidadValida(), ...cambio }, false, "ámbito o vigencia inválido");
});

test("bloqueos y excepciones: motivo condicionado, cierres y disponibilidad adicional", () => {
  const bloqueo = {
    profesionalId: "profesional", sucursalId: "sucursal",
    fechaInicio: turnoValido().fechaInicio, fechaFin: turnoValido().fechaFin,
    tipo: "EXTRAORDINARIO",
  };
  comprobar(disponibilidad.bloqueoHorarioSchema({ motivoObligatorio: false }), bloqueo, true, "motivo opcional");
  comprobar(disponibilidad.bloqueoHorarioSchema({ motivoObligatorio: true }), bloqueo, false, "motivo requerido");
  comprobar(disponibilidad.bloqueoHorarioSchema({ motivoObligatorio: true }), { ...bloqueo, motivo: "Mantenimiento" }, true, "motivo válido");
  comprobar(disponibilidad.bloqueoHorarioSchema({ motivoObligatorio: false }), { ...bloqueo, tipo: "OTRO" }, false, "tipo inválido");
  const excepcion = {
    profesionalId: "profesional", sucursalId: "sucursal", fecha: "2026-11-26",
    zonaHoraria: "America/Argentina/Buenos_Aires", franjas: [], descansos: [],
  };
  comprobar(disponibilidad.excepcionDisponibilidadSchema, excepcion, true, "cierre excepcional");
  comprobar(disponibilidad.excepcionDisponibilidadSchema, { ...excepcion, franjas: [franja("10:00", "12:00")] }, true, "disponibilidad excepcional");
  comprobar(disponibilidad.excepcionDisponibilidadSchema, { ...excepcion, descansos: [franja("10:00", "11:00")] }, false, "descanso fuera de jornada");
});

test("configuración: plazos, señas, recordatorios y zona horaria", () => {
  const schema = configuracion.configuracionTurnosSchema;
  comprobar(schema, configuracionValida(), true, "configuración inicial editable");
  for (const cambio of [
    { anticipacionMinimaReservaMinutos: -1 },
    { anticipacionMinimaReservaMinutos: 10, anticipacionMaximaReservaMinutos: 9 },
    { intervaloAgendaMinutos: 0 },
    { intervaloEntreTurnosMinutos: -1 },
    { plazoMinimoCancelacionMinutos: 1.5 },
    { zonaHoraria: "UTC-3" }, { zonaHoraria: "Zona/Inexistente" },
    { modoConfirmacion: "OTRA" },
    { reservasOnlineHabilitadas: "true" },
    { centroEsteticaId: "centro-inyectado" },
    { sena: { obligatoria: true, tipo: "PORCENTAJE", valor: 101 } },
    { sena: { obligatoria: true, tipo: "FIJO", valor: 10.5 } },
    { sena: { obligatoria: true, tipo: "FIJO", valor: 0 } },
    { sena: { obligatoria: false, tipo: "FIJO", valor: 100 } },
    { recordatorios: { habilitados: true, anticipacionesMinutos: [] } },
    { recordatorios: { habilitados: true, anticipacionesMinutos: [60, 60] } },
    { recordatorios: { habilitados: true, anticipacionesMinutos: [0] } },
    { recordatorios: { habilitados: true, anticipacionesMinutos: Array(1) } },
    { recordatorios: { habilitados: false, anticipacionesMinutos: [60] } },
  ]) comprobar(schema, { ...configuracionValida(), ...cambio }, false, "configuración inválida");
  for (const cambio of [
    { anticipacionMinimaReservaMinutos: 10, anticipacionMaximaReservaMinutos: 10 },
    { sena: { obligatoria: true, tipo: "PORCENTAJE", valor: 12.5 } },
    { sena: { obligatoria: true, tipo: "PORCENTAJE", valor: 100 } },
    { sena: { obligatoria: true, tipo: "FIJO", valor: 1000 } },
    { recordatorios: { habilitados: true, anticipacionesMinutos: [60, 1440] } },
    { zonaHoraria: "UTC" },
  ]) comprobar(schema, { ...configuracionValida(), ...cambio }, true, "configuración válida");
});
