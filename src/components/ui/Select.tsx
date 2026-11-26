import { useId } from "react";
import type { SelectHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, CircleAlert } from "lucide-react";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "multiple"
> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  helperText?: string;
  icon?: LucideIcon;
  fullWidth?: boolean;
  containerClassName?: string;
}

export default function Select({
  label,
  options,
  placeholder = "Seleccioná una opción",
  error,
  helperText,
  icon: Icon,
  fullWidth = true,
  containerClassName = "",
  className = "",
  id,
  required,
  disabled,
  value,
  defaultValue,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const messageId = `${selectId}-message`;

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
          htmlFor={selectId}
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

        <select
          {...props}
          id={selectId}
          required={required}
          disabled={disabled}
          value={value}
          defaultValue={value === undefined ? (defaultValue ?? "") : undefined}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={describedBy || undefined}
          className={`
            h-10 w-full min-w-0 appearance-none
            rounded-input border bg-surface
            px-3 pr-10 font-sans text-sm text-text-primary
            outline-none transition-colors
            has-[option:checked[value='']]:text-text-secondary/60
            disabled:cursor-not-allowed
            disabled:bg-background disabled:opacity-60
            ${Icon ? "pl-10" : ""}
            ${
              error
                ? "border-error focus:border-error focus:ring-2 focus:ring-error/15"
                : "border-border focus:border-primary focus:ring-2 focus:ring-primary/15"
            }
            ${className}
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="bg-surface text-text-primary"
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          strokeWidth={1.7}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 text-text-secondary"
        />
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
