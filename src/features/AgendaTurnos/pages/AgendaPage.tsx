import { CalendarDays } from "lucide-react";
import EmptyState from "../../../components/ui/EmptyState";

export default function AgendaPage() {
  return (
    <EmptyState
      icon={CalendarDays}
      title="Agenda"
      description="Próximamente podrás consultar los turnos en el calendario."
      bordered
    />
  );
}

