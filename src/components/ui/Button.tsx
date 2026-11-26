import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { LoaderCircle } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-primary text-white hover:bg-primary-hover",

  secondary:
    "border-transparent bg-secondary text-primary hover:bg-secondary-hover",

  outline: "border-primary bg-transparent text-primary hover:bg-primary-light",

  ghost:
    "border-transparent bg-transparent text-primary hover:bg-primary-light",

  danger: "border-transparent bg-error text-white hover:bg-error/90",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  loading = false,
  className = "",
  type = "button",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || props["aria-busy"]}
      className={`
        inline-flex shrink-0 items-center justify-center gap-2
        rounded-button border font-sans font-medium
        transition-colors duration-200
        disabled:pointer-events-none disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading && (
        <LoaderCircle
          size={size === "sm" ? 14 : 18}
          strokeWidth={1.8}
          aria-hidden="true"
          className="animate-spin motion-reduce:animate-none"
        />
      )}

      {!loading && Icon && iconPosition === "left" && (
        <Icon size={size === "sm" ? 14 : 18} strokeWidth={1.8} />
      )}

      {children}

      {!loading && Icon && iconPosition === "right" && (
        <Icon size={size === "sm" ? 14 : 18} strokeWidth={1.8} />
      )}
    </button>
  );
}
