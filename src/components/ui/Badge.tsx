import type { HTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: LucideIcon;
  dot?: boolean;
  rounded?: boolean;
  outline?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  primary: "bg-primary-light text-primary",
  secondary: "bg-secondary/50 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-[#95661e]",
  danger: "bg-error/10 text-error",
  info: "bg-info/10 text-info",
  neutral: "bg-text-secondary/10 text-text-secondary",
};

const outlineVariants: Record<BadgeVariant, string> = {
  primary: "border-primary text-primary",
  secondary: "border-secondary text-primary",
  success: "border-success text-success",
  warning: "border-warning text-[#95661e]",
  danger: "border-error text-error",
  info: "border-info text-info",
  neutral: "border-text-secondary/40 text-text-secondary",
};

const sizes: Record<BadgeSize, string> = {
  sm: "gap-1 px-2 py-0.5 text-[10px]",
  md: "gap-1.5 px-2.5 py-1 text-xs",
  lg: "gap-2 px-3 py-1.5 text-sm",
};

export default function Badge({
  children,
  variant = "neutral",
  size = "md",
  icon: Icon,
  dot = false,
  rounded = true,
  outline = false,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={`
        inline-flex w-fit items-center justify-center
        whitespace-nowrap border font-sans font-medium
        ${rounded ? "rounded-full" : "rounded-md"}
        ${sizes[size]}
        ${
          outline
            ? `bg-transparent ${outlineVariants[variant]}`
            : `border-transparent ${variants[variant]}`
        }
        ${className}
      `}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
        />
      )}

      {Icon && (
        <Icon
          size={size === "sm" ? 12 : size === "lg" ? 16 : 14}
          strokeWidth={1.8}
          aria-hidden="true"
          className="shrink-0"
        />
      )}

      {children}
    </span>
  );
}
