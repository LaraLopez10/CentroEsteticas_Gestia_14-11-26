import { useEffect, useId, useRef } from "react";
import type { InputHTMLAttributes } from "react";
import { Check, Minus, CircleAlert } from "lucide-react";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
  containerClassName?: string;
}

export default function Checkbox({
  label,
  description,
  error,
  indeterminate = false,
  containerClassName = "",
  className = "",
  id,
  disabled,
  required,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  const descriptionId = `${checkboxId}-description`;
  const errorId = `${checkboxId}-error`;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const describedBy = [
    props["aria-describedby"],
    description ? descriptionId : undefined,
    error ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      <label
        htmlFor={checkboxId}
        className={`flex w-fit items-start gap-3
          ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        `}
      >
        <div className="relative mt-0.5 flex shrink-0">
          <input
            {...props}
            ref={inputRef}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            required={required}
            aria-invalid={error ? true : props["aria-invalid"]}
            aria-describedby={describedBy || undefined}
            className={`
              peer h-5 w-5 appearance-none rounded-[4px]
              border bg-surface transition-colors
              checked:border-primary checked:bg-primary
              indeterminate:border-primary indeterminate:bg-primary
              focus-visible:ring-2 focus-visible:ring-primary/20
              disabled:cursor-not-allowed
              ${error ? "border-error" : "border-text-secondary/50"}
              ${className}
            `}
          />

          <Check
            size={15}
            strokeWidth={2.5}
            aria-hidden="true"
            className="pointer-events-none absolute
              left-1/2 top-1/2 hidden
              -translate-x-1/2 -translate-y-1/2
              text-white peer-checked:block
              peer-indeterminate:hidden"
          />

          <Minus
            size={15}
            strokeWidth={2.5}
            aria-hidden="true"
            className="pointer-events-none absolute
              left-1/2 top-1/2 hidden
              -translate-x-1/2 -translate-y-1/2
              text-white peer-indeterminate:block"
          />
        </div>

        {(label || description) && (
          <div className="flex min-w-0 flex-col gap-1">
            {label && (
              <span className="font-sans text-sm text-text-primary">
                {label}

                {required && <span className="ml-1 text-error">*</span>}
              </span>
            )}

            {description && (
              <span id={descriptionId} className="text-xs text-text-secondary">
                {description}
              </span>
            )}
          </div>
        )}
      </label>

      {error && (
        <div
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 pl-8 text-xs text-error"
        >
          <CircleAlert size={14} className="shrink-0" aria-hidden="true" />

          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
