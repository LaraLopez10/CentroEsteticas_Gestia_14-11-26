import { ChevronDown } from "lucide-react";

interface MenuUsuarioProps {
  nombre?: string;
  rol?: string;
  iniciales?: string;
}

export default function MenuUsuario({
  nombre = "Administración",
  rol = "Mi perfil",
  iniciales = "AD",
}: MenuUsuarioProps) {
  return (
    <button
      type="button"
      aria-label="Menú de usuario"
      className="flex items-center gap-3 rounded-button p-2 text-left transition-colors hover:bg-background"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary font-bold text-primary">
        {iniciales}
      </div>

      <div className="hidden flex-col sm:flex">
        <span className="text-sm font-medium text-text-primary">{nombre}</span>

        <span className="text-xs text-text-secondary">{rol}</span>
      </div>

      <ChevronDown size={16} className="hidden text-text-secondary sm:block" />
    </button>
  );
}
