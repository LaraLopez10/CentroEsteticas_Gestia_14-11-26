import type { ReactNode, HTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

type CardVariant = "default" | "soft" | "outline" | "primary";
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  children: ReactNode;
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
  footer?: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  divided?: boolean;
}

const variants: Record<CardVariant, string> = {
  default: "border-border bg-surface",
  soft: "border-transparent bg-primary-light",
  outline: "border-primary bg-transparent",
  primary: "border-primary bg-primary text-white",
};

const paddings: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-6",
};

export default function Card({
  children,
  title,
  description,
  icon: Icon,
  actions,
  footer,
  variant = "default",
  padding = "md",
  divided = false,
  className = "",
  ...props
}: CardProps) {
  const isPrimary = variant === "primary";
  const hasHeader = title || description || Icon || actions;

  return (
    <div
      {...props}
      className={`
        flex min-w-0 flex-col rounded-card border
        ${variants[variant]}
        ${className}
      `}
    >
      {hasHeader && (
        <header
          className={`
            flex flex-wrap items-start justify-between gap-3
            ${paddings[padding]}
            ${
              divided
                ? isPrimary
                  ? "border-b border-white/20"
                  : "border-b border-border"
                : ""
            }
          `}
        >
          <div className="flex min-w-0 flex-1 items-start gap-3">
            {Icon && (
              <div
                className={`
                  flex h-10 w-10 shrink-0 items-center
                  justify-center rounded-button
                  ${
                    isPrimary
                      ? "bg-white/10 text-white"
                      : "bg-primary-light text-primary"
                  }
                `}
              >
                <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
              </div>
            )}

            <div className="min-w-0">
              {title && (
                <h2
                  className={`
                    font-display text-xl
                    ${isPrimary ? "text-white" : "text-primary"}
                  `}
                >
                  {title}
                </h2>
              )}

              {description && (
                <p
                  className={`
                    mt-1 text-sm
                    ${isPrimary ? "text-white/80" : "text-text-secondary"}
                  `}
                >
                  {description}
                </p>
              )}
            </div>
          </div>

          {actions && (
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
          )}
        </header>
      )}

      <div className={`min-w-0 flex-1 ${paddings[padding]}`}>{children}</div>

      {footer && (
        <footer
          className={`
            flex flex-wrap items-center justify-end gap-2
            ${paddings[padding]}
            ${
              divided
                ? isPrimary
                  ? "border-t border-white/20"
                  : "border-t border-border"
                : ""
            }
          `}
        >
          {footer}
        </footer>
      )}
    </div>
  );
}
