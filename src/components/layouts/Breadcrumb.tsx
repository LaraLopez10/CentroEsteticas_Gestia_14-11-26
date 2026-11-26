import { ChevronRight, House } from "lucide-react";

interface BreadcrumbProps {
  items?: string[];
}

export default function Breadcrumb({ items = ["Inicio"] }: BreadcrumbProps) {
  return (
    <nav aria-label="Ruta de navegación" className="flex items-center gap-2">
      <House size={17} strokeWidth={1.7} className="text-text-secondary" />

      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-text-secondary" />

          <span
            className={`text-sm ${
              index === items.length - 1
                ? "font-medium text-primary"
                : "text-text-secondary"
            }`}
          >
            {item}
          </span>
        </div>
      ))}
    </nav>
  );
}
