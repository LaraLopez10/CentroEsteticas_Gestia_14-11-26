import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

type EmptyStateSize = "sm" | "md" | "lg";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
  size?: EmptyStateSize;
  bordered?: boolean;
  className?: string;
}

const sizes: Record<EmptyStateSize, string> = {
  sm: "gap-2 px-4 py-6",
  md: "gap-3 px-6 py-12",
  lg: "gap-4 px-8 py-20",
};

const iconSizes: Record<EmptyStateSize, string> = {
  sm: "h-10 w-10",
  md: "h-14 w-14",
  lg: "h-20 w-20",
};

const iconPixels: Record<EmptyStateSize, number> = {
  sm: 20,
  md: 26,
  lg: 36,
};

const titleSizes: Record<EmptyStateSize, string> = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

export default function EmptyState({
  title = "No hay registros",
  description = "Todavía no hay información para mostrar.",
  icon: Icon = Inbox,
  actions,
  size = "md",
  bordered = false,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`
        flex w-full min-w-0 flex-col items-center
        justify-center text-center
        ${sizes[size]}
        ${bordered ? "rounded-card border border-border bg-surface" : ""}
        ${className}
      `}
    >
      <div
        className={`
          flex shrink-0 items-center justify-center
          rounded-full bg-primary-light text-primary
          ${iconSizes[size]}
        `}
      >
        <Icon size={iconPixels[size]} strokeWidth={1.5} aria-hidden="true" />
      </div>

      <div className="flex max-w-md flex-col gap-2">
        <h3
          className={`
            font-display text-primary
            ${titleSizes[size]}
          `}
        >
          {title}
        </h3>

        {description && (
          <p className="font-sans text-sm leading-relaxed text-text-secondary">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
