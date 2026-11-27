import { Outlet } from "react-router-dom";
import PaginaModulo from "../../../components/shared/PaginaModulo";
import EncabezadoModulo from "../../../components/shared/EncabezadoModulo";

export default function ClientesPage() {
  return (
    <PaginaModulo>
      <EncabezadoModulo
        title="Clientes"
        description="Gestioná la información de tus clientes."
      />
      <Outlet />
    </PaginaModulo>
  );
}
