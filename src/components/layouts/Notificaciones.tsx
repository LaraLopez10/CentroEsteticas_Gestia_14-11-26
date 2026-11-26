import { Bell } from "lucide-react";

export default function Notificaciones() {
  return (
    <button
      type="button"
      aria-label="Notificaciones"
      className="relative flex h-10 w-10 items-center justify-center rounded-button text-primary transition-colors hover:bg-primary-light"
    >
      <Bell size={21} strokeWidth={1.7} />

      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-nav-borgona ring-2 ring-surface" />
    </button>
  );
}
