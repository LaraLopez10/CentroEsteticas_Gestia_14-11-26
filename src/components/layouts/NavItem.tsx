import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  label: string;
  icon: LucideIcon;
  to: string;
}

export default function NavItem({ label, icon: Icon, to }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5
        font-sans text-sm transition-colors ${
          isActive
            ? "bg-secondary font-bold text-primary"
            : "text-surface hover:bg-primary-hover"
        }`
      }
    >
      <Icon size={19} strokeWidth={1.7} />
      <span>{label}</span>
    </NavLink>
  );
}
