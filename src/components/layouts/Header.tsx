import Breadcrumb from "./Breadcrumb";
import Notificaciones from "./Notificaciones";
import MenuUsuario from "./MenuUsuario";
import MenuToggle from "./MenuToggle";

export default function Header() {
  return (
    <header className="navigation-theme flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-4">
        <MenuToggle />

        <div className="h-7 w-px bg-border" />

        <Breadcrumb />
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Notificaciones />

        <div className="h-8 w-px bg-border" />

        <MenuUsuario />
      </div>
    </header>
  );
}
