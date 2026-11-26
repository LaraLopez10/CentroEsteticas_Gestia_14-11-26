import { CalendarCheck } from "lucide-react";
import EmptyState from "../../../components/ui/EmptyState";

export default function TurnosPage() {
  return (
    <EmptyState
      icon={CalendarCheck}
      title="Turnos"
      description="Próximamente podrás consultar y gestionar los turnos."
      bordered
    />
  );
}

