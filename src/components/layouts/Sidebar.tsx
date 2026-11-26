import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Sparkles,
  Contact,
  MapPin,
  DoorOpen,
  Package,
  Wallet,
  ChartNoAxesCombined,
  Globe,
  Palette,
  Settings,
} from "lucide-react";

import NavItem from "./NavItem";
import NavGroup from "./NavGroup";
import SelectorSucursal from "./SelectorSucursal";

const navigation = [
  {
    title: "General",
    items: [
      { label: "Inicio", icon: LayoutDashboard, to: "/" },
      { label: "Agenda y turnos", icon: CalendarDays, to: "/turnos" },
      { label: "Clientes", icon: Users, to: "/clientes" },
      { label: "Servicios", icon: Sparkles, to: "/servicios" },
      { label: "Profesionales", icon: Contact, to: "/profesionales" },
      { label: "Sucursales", icon: MapPin, to: "/sucursales" },
      { label: "Salas", icon: DoorOpen, to: "/salas" },
    ],
  },
  {
    title: "Administración",
    items: [
      { label: "Inventario", icon: Package, to: "/inventario" },
      { label: "Caja y movimientos", icon: Wallet, to: "/caja" },
      { label: "Reportes", icon: ChartNoAxesCombined, to: "/reportes" },
    ],
  },
  {
    title: "Sistema",
    items: [
      { label: "Sitio público", icon: Globe, to: "/sitio-publico" },
      { label: "Personalización", icon: Palette, to: "/personalizacion" },
      { label: "Configuración", icon: Settings, to: "/configuracion" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="navigation-theme navigation-sidebar hidden h-full w-64 shrink-0 flex-col bg-primary text-surface lg:flex">
      <div className="flex flex-col items-center px-6 py-8">
        <span className="font-display text-4xl tracking-wider">Gestia</span>

        <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-nav-rosa">
          Gestión estética
        </span>
      </div>

      <SelectorSucursal />

      <nav
        aria-label="Navegación principal"
        className="min-h-0 flex-1 overflow-y-auto px-3"
      >
        {navigation.map((group) => (
          <NavGroup key={group.title} title={group.title}>
            {group.items.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </NavGroup>
        ))}
      </nav>

      <div className="border-t border-nav-rosa/30 p-4 text-center">
        <span className="text-xs text-nav-rosa">Gestia · Versión 1.0</span>
      </div>
    </aside>
  );
}
