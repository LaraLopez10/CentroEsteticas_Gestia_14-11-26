import { Clock } from "lucide-react";
import EmptyState from "../../../components/ui/EmptyState";

export default function DisponibilidadPage() {
  return (
    <EmptyState
      icon={Clock}
      title="Disponibilidad"
      description="Próximamente podrás organizar los horarios y bloqueos de tus profesionales."
      bordered
    />
  );
}

