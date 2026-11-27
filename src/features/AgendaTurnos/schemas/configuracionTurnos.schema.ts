import { MODOS_CONFIRMACION, PORCENTAJE_MAXIMO, TIPOS_SENA } from "../constants/agenda.constants";
import type { ConfiguracionTurnosRequest } from "../types/configuracionTurnos.types";
import { booleano, crearEsquema, error, lista, numero, objeto, opcion, zonaHoraria } from "./validacion";

const PLAZOS = [
  "anticipacionMinimaReservaMinutos", "anticipacionMaximaReservaMinutos",
  "plazoMinimoCancelacionMinutos", "plazoMinimoReprogramacionMinutos",
  "intervaloEntreTurnosMinutos",
] as const;

export const configuracionTurnosSchema = crearEsquema<ConfiguracionTurnosRequest>((entrada, errores) => {
  const dato = objeto(entrada, [
    ...PLAZOS, "reservasOnlineHabilitadas", "modoConfirmacion",
    "cancelacionesOnlineHabilitadas", "motivoCancelacionObligatorio",
    "reprogramacionesHabilitadas", "sena", "intervaloAgendaMinutos",
    "recordatorios", "zonaHoraria",
  ], errores);
  if (!dato) return;
  for (const campo of [
    "reservasOnlineHabilitadas", "cancelacionesOnlineHabilitadas",
    "motivoCancelacionObligatorio", "reprogramacionesHabilitadas",
  ]) booleano(dato[campo], campo, errores);
  for (const campo of PLAZOS) numero(dato[campo], campo, errores);
  numero(dato.intervaloAgendaMinutos, "intervaloAgendaMinutos", errores, 1);
  opcion(dato.modoConfirmacion, MODOS_CONFIRMACION, "modoConfirmacion", errores);
  zonaHoraria(dato.zonaHoraria, "zonaHoraria", errores);

  if (typeof dato.anticipacionMaximaReservaMinutos === "number"
    && typeof dato.anticipacionMinimaReservaMinutos === "number"
    && dato.anticipacionMaximaReservaMinutos < dato.anticipacionMinimaReservaMinutos) {
    error(errores, "anticipacionMaximaReservaMinutos", "La anticipación máxima debe ser mayor o igual a la mínima.");
  }
  // Las cancelaciones de reservas existentes pueden seguir habilitadas aunque se cierre la reserva online.
  // Se conservan los plazos cuando se deshabilita una opción para no perder preferencias.
  const sena = objeto(dato.sena, ["obligatoria", "tipo", "valor"], errores, "sena");
  if (sena) {
    booleano(sena.obligatoria, "sena.obligatoria", errores);
    opcion(sena.tipo, TIPOS_SENA, "sena.tipo", errores);
    const valorValido = numero(sena.valor, "sena.valor", errores, 0, sena.tipo !== "PORCENTAJE");
    if (valorValido && sena.tipo === "PORCENTAJE" && (sena.valor as number) > PORCENTAJE_MAXIMO) {
      error(errores, "sena.valor", "El porcentaje debe estar entre 0 y 100.");
    }
    if (sena.obligatoria === false && sena.valor !== 0) {
      error(errores, "sena.valor", "Una seña deshabilitada debe tener valor cero.");
    }
    if (sena.obligatoria === true && sena.valor === 0) {
      error(errores, "sena.valor", "Una seña obligatoria debe tener un valor mayor a cero.");
    }
  }

  const recordatorios = objeto(dato.recordatorios, ["habilitados", "anticipacionesMinutos"], errores, "recordatorios");
  if (recordatorios) {
    booleano(recordatorios.habilitados, "recordatorios.habilitados", errores);
    const anticipaciones = lista(recordatorios.anticipacionesMinutos, "recordatorios.anticipacionesMinutos", errores);
    if (anticipaciones) {
      anticipaciones.forEach((valor, index) => numero(valor, `recordatorios.anticipacionesMinutos.${index}`, errores, 1));
      if (new Set(anticipaciones).size !== anticipaciones.length) {
        error(errores, "recordatorios.anticipacionesMinutos", "No repitas anticipaciones.");
      }
      if (recordatorios.habilitados === true && anticipaciones.length === 0) {
        error(errores, "recordatorios.anticipacionesMinutos", "Definí al menos una anticipación.");
      }
      if (recordatorios.habilitados === false && anticipaciones.length > 0) {
        error(errores, "recordatorios.anticipacionesMinutos", "Los recordatorios deshabilitados no deben incluir anticipaciones.");
      }
    }
  }
});

