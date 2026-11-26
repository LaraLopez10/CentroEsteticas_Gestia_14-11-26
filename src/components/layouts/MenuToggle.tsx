import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface MenuToggleProps {
  collapsed?: boolean;
  onClick?: () => void;
}

export default function MenuToggle({
  collapsed = false,
  onClick,
}: MenuToggleProps) {
  const Icon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={collapsed ? "Abrir menú" : "Cerrar menú"}
      className="flex h-10 w-10 items-center justify-center rounded-button text-primary transition-colors hover:bg-primary-light"
    >
      <Icon size={21} strokeWidth={1.7} />
    </button>
  );
}
