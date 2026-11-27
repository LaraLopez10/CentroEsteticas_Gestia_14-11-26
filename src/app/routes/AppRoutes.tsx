import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../../components/layouts/AppLayout";
import PaginaModulo from "../../components/shared/PaginaModulo";
import EncabezadoModulo from "../../components/shared/EncabezadoModulo";
import UIKitPages from "../../features/desing-system/pages/UIKitPages";
import AgendaTurnosPage from "../../features/AgendaTurnos/pages/AgendaTurnosPage";
import AgendaPage from "../../features/AgendaTurnos/pages/AgendaPage";
import TurnosPage from "../../features/AgendaTurnos/pages/TurnosPage";
import DisponibilidadPage from "../../features/AgendaTurnos/pages/DisponibilidadPage";
import ConfiguracionTurnosPage from "../../features/AgendaTurnos/pages/ConfiguracionTurnosPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import {
  ClientesPage,
  ListadoClientesPage,
  FormClientePage,
  SeccionClientesPage,
  CLIENTES_BASE_PATH,
  CLIENTES_RUTAS,
  CLIENTES_SECCIONES_PERFIL,
} from "../../features/clientes";
import {
  AGENDA_TURNOS_BASE_PATH,
  AGENDA_TURNOS_SECCIONES,
} from "../../features/AgendaTurnos/constants/agenda.constants";

const agendaTurnosPages = {
  agenda: AgendaPage,
  listado: TurnosPage,
  disponibilidad: DisponibilidadPage,
  configuracion: ConfiguracionTurnosPage,
};

const routes = [
  {
    path: "/inicio",
    title: "Inicio",
    description: "Resumen general de tu centro estético.",
  },
  {
    path: "/servicios",
    title: "Servicios",
    description: "Administrá los tratamientos y servicios.",
  },
  {
    path: "/profesionales",
    title: "Profesionales",
    description: "Gestioná tu equipo de especialistas.",
  },
  {
    path: "/sucursales",
    title: "Sucursales",
    description: "Administrá las sucursales de tu negocio.",
  },
  {
    path: "/salas",
    title: "Salas",
    description: "Organizá los espacios de trabajo.",
  },
  {
    path: "/inventario",
    title: "Inventario",
    description: "Controlá tus productos e insumos.",
  },
  {
    path: "/caja",
    title: "Caja y movimientos",
    description: "Administrá los ingresos y egresos.",
  },
  {
    path: "/reportes",
    title: "Reportes",
    description: "Consultá el rendimiento de tu negocio.",
  },
  {
    path: "/sitio-publico",
    title: "Sitio público",
    description: "Administrá tu sitio de reservas.",
  },
  {
    path: "/personalizacion",
    title: "Personalización",
    description: "Personalizá la identidad de tu centro.",
  },
  {
    path: "/configuracion",
    title: "Configuración",
    description: "Administrá las preferencias del sistema.",
  },
];

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={CLIENTES_BASE_PATH} element={<ClientesPage />}>
          <Route index element={<ListadoClientesPage />} />
          <Route path={CLIENTES_RUTAS.nuevo} element={<FormClientePage modo="crear" />} />
          <Route
            path={CLIENTES_RUTAS.cumpleanos}
            element={
              <SeccionClientesPage
                title="Cumpleaños"
                description="Cumpleaños de los clientes del establecimiento."
              />
            }
          />
          <Route path={CLIENTES_RUTAS.cliente}>
            <Route path={CLIENTES_RUTAS.editar} element={<FormClientePage modo="editar" />} />
            {CLIENTES_SECCIONES_PERFIL.map(({ path, title, description }) => (
              path === "" ? (
                <Route
                  key="perfil"
                  index
                  element={<SeccionClientesPage title={title} description={description} />}
                />
              ) : (
                <Route
                  key={path}
                  path={path}
                  element={<SeccionClientesPage title={title} description={description} />}
                />
              )
            ))}
          </Route>
          <Route path="*" element={<Navigate to={CLIENTES_BASE_PATH} replace />} />
        </Route>
        <Route path={AGENDA_TURNOS_BASE_PATH} element={<AgendaTurnosPage />}>
          <Route index element={<Navigate to="agenda" replace />} />
          {AGENDA_TURNOS_SECCIONES.map(({ id }) => {
            const Page = agendaTurnosPages[id];

            return <Route key={id} path={id} element={<Page />} />;
          })}
          <Route
            path="*"
            element={
              <Navigate to={`${AGENDA_TURNOS_BASE_PATH}/agenda`} replace />
            }
          />
        </Route>
        {routes.map(({ path, title, description }) => (
          <Route
            key={path}
            path={path}
            element={
              <PaginaModulo>
                <EncabezadoModulo title={title} description={description} />
              </PaginaModulo>
            }
          />
        ))}
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/ui-kit" element={<UIKitPages />} />
    </Routes>
  );
}
