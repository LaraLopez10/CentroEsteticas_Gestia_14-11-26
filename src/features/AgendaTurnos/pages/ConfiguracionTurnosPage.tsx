import { Settings } from "lucide-react";
import EmptyState from "../../../components/ui/EmptyState";

export default function ConfiguracionTurnosPage() {
  return (
    <EmptyState
      icon={Settings}
      title="Configuración de turnos"
      description="Próximamente podrás definir las preferencias de reservas, cancelaciones, señas y recordatorios."
      bordered
    />
  );
}

