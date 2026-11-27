import { Users } from "lucide-react";
import EmptyState from "../../../components/ui/EmptyState";

interface SeccionClientesPendienteProps {
  title: string;
  description: string;
}

/** Reserva visual de primera etapa, compartida por las páginas del módulo. */
export default function SeccionClientesPendiente({
  title,
  description,
}: SeccionClientesPendienteProps) {
  return (
    <EmptyState
      icon={Users}
      title={title}
      description={`${description} Disponible en una próxima etapa.`}
      bordered
    />
  );
}
