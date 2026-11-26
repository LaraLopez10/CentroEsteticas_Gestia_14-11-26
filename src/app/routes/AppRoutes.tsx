import { Route, Routes } from "react-router-dom";
import AppLayout from "../../components/layouts/AppLayout";
import PaginaModulo from "../../components/shared/PaginaModulo";
import EncabezadoModulo from "../../components/shared/EncabezadoModulo";
import UIKitPages from "../../features/desing-system/pages/UIKitPages";

const routes = [
  {
    path: "/",
    title: "Inicio",
    description: "Resumen general de tu centro estético.",
  },
  {
    path: "/turnos",
    title: "Agenda y turnos",
    description: "Administrá las reservas y los turnos.",
  },
  {
    path: "/clientes",
    title: "Clientes",
    description: "Gestioná la información de tus clientes.",
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
      <Route path="/" element={<AppLayout />}>
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
      <Route path="/ui-kit" element={<UIKitPages />} />
    </Routes>
  );
}
