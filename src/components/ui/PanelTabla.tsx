import type { ReactNode } from "react";
import Card from "./Card";

interface PanelTablaProps {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  toolbar?: ReactNode;
  footer?: ReactNode;
  selectionActions?: ReactNode;
  selectedCount?: number;
  className?: string;
}

export default function PanelTabla({
  children,
  title,
  description,
  actions,
  toolbar,
  footer,
  selectionActions,
  selectedCount = 0,
  className = "",
}: PanelTablaProps) {
  const hasHeader = title || description || actions;

  return (
    <Card padding="none" className={`overflow-hidden ${className}`}>
      {hasHeader && (
        <header className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            {title && (
              <h2 className="font-display text-xl text-primary">{title}</h2>
            )}

            {description && (
              <p className="mt-1 text-sm text-text-secondary">{description}</p>
            )}
          </div>

          {actions && (
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
          )}
        </header>
      )}

      {toolbar && (
        <div
          className={`
            flex flex-wrap items-center gap-3 px-5 py-4
            ${hasHeader ? "border-t border-border" : ""}
          `}
        >
          {toolbar}
        </div>
      )}

      {selectedCount > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-primary-light px-5 py-3">
          <span className="text-sm font-medium text-primary">
            {selectedCount}{" "}
            {selectedCount === 1
              ? "registro seleccionado"
              : "registros seleccionados"}
          </span>

          {selectionActions && (
            <div className="flex flex-wrap items-center gap-2">
              {selectionActions}
            </div>
          )}
        </div>
      )}

      <div className="min-w-0">{children}</div>

      {footer && (
        <footer className="border-t border-border px-5 py-4">{footer}</footer>
      )}
    </Card>
  );
}
