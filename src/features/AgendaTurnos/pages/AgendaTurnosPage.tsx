import { Outlet, useMatch, useNavigate } from "react-router-dom";
import PaginaModulo from "../../../components/shared/PaginaModulo";
import EncabezadoModulo from "../../../components/shared/EncabezadoModulo";
import Pestañas from "../../../components/ui/Pestañas";
import {
  AGENDA_TURNOS_BASE_PATH,
  AGENDA_TURNOS_SECCIONES,
} from "../constants/agenda.constants";

export default function AgendaTurnosPage() {
  const navigate = useNavigate();
  const match = useMatch(`${AGENDA_TURNOS_BASE_PATH}/:seccion`);

  return (
    <PaginaModulo>
      <EncabezadoModulo
        title="Agenda y turnos"
        description="Administrá las reservas y los turnos."
      />
      <Pestañas
        ariaLabel="Secciones de agenda y turnos"
        value={match?.params.seccion ?? "agenda"}
        onChange={(id) => navigate(`${AGENDA_TURNOS_BASE_PATH}/${id}`)}
        items={AGENDA_TURNOS_SECCIONES.map(({ id, label }) => ({
          id,
          label,
          content: <Outlet />,
        }))}
      />
    </PaginaModulo>
  );
}

