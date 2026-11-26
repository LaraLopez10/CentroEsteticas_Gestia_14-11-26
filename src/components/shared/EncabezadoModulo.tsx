import type { ReactNode } from "react";

interface EncabezadoModuloProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export default function EncabezadoModulo({
  title,
  description,
  actions,
  className = "",
}: EncabezadoModuloProps) {
  return (
    <header
      className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div className="min-w-0">
        <h1 className="font-display text-3xl text-primary md:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 font-sans text-sm text-text-secondary">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </header>
  );
}
