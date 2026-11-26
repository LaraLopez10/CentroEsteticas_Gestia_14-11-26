import { useId, useState } from "react";
import type { InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { Eye, EyeOff, CircleAlert } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: LucideIcon;
  fullWidth?: boolean;
  containerClassName?: string;
}

export default function Input({
  label,
  error,
  helperText,
  icon: Icon,
  fullWidth = true,
  containerClassName = "",
  className = "",
  type = "text",
  id,
  required,
  disabled,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const messageId = `${inputId}-message`;

  const describedBy = [
    props["aria-describedby"],
    error || helperText ? messageId : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`flex min-w-0 flex-col gap-1.5
        ${fullWidth ? "w-full" : ""}
        ${containerClassName}`}
    >
      {label && (
        <label
          htmlFor={inputId}
          className="font-sans text-sm font-medium text-text-primary"
        >
          {label}

          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <Icon
            size={18}
            strokeWidth={1.7}
            aria-hidden="true"
            className={`pointer-events-none absolute left-3
              ${error ? "text-error" : "text-text-secondary"}`}
          />
        )}

        <input
          {...props}
          id={inputId}
          type={inputType}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={describedBy || undefined}
          className={`
            h-10 w-full min-w-0 rounded-input border
            bg-surface px-3 font-sans text-sm
            text-text-primary
            outline-none transition-colors
            placeholder:text-text-secondary/60
            disabled:cursor-not-allowed
            disabled:bg-background disabled:opacity-60
            ${Icon ? "pl-10" : ""}
            ${isPassword ? "pr-11" : ""}
            ${
              error
                ? "border-error focus:border-error focus:ring-2 focus:ring-error/15"
                : "border-border focus:border-primary focus:ring-2 focus:ring-primary/15"
            }
            ${className}
          `}
        />

        {isPassword && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            className="absolute right-3 flex items-center
              justify-center text-text-secondary
              hover:text-primary disabled:opacity-50"
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={1.7} />
            ) : (
              <Eye size={18} strokeWidth={1.7} />
            )}
          </button>
        )}
      </div>

      {error ? (
        <div
          id={messageId}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-error"
        >
          <CircleAlert size={14} className="shrink-0" aria-hidden="true" />

          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p id={messageId} className="text-xs text-text-secondary">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
