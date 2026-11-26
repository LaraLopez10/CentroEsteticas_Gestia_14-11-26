import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import { CircleAlert } from "lucide-react";

type SwitchSize = "sm" | "md" | "lg";

interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "role"
> {
  label?: string;
  description?: string;
  error?: string;
  size?: SwitchSize;
  labelPosition?: "left" | "right";
  containerClassName?: string;
}

const sizes: Record<SwitchSize, string> = {
  sm: "h-5 w-9 after:h-4 after:w-4 peer-checked:after:translate-x-4",
  md: "h-6 w-11 after:h-5 after:w-5 peer-checked:after:translate-x-5",
  lg: "h-7 w-13 after:h-6 after:w-6 peer-checked:after:translate-x-6",
};

export default function Switch({
  label,
  description,
  error,
  size = "md",
  labelPosition = "left",
  containerClassName = "",
  className = "",
  disabled,
  id,
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;

  const descriptionId = `${switchId}-description`;
  const errorId = `${switchId}-error`;

  const describedBy = [
    props["aria-describedby"],
    description ? descriptionId : undefined,
    error ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${containerClassName}`}>
      <label
        htmlFor={switchId}
        className={`
          flex items-center gap-3
          ${
            labelPosition === "left"
              ? "justify-between"
              : "flex-row-reverse justify-end"
          }
          ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        `}
      >
        {(label || description) && (
          <div className="flex min-w-0 flex-col gap-1">
            {label && (
              <span className="font-sans text-sm font-medium text-text-primary">
                {label}
              </span>
            )}

            {description && (
              <span id={descriptionId} className="text-xs text-text-secondary">
                {description}
              </span>
            )}
          </div>
        )}

        <div className="relative flex shrink-0 items-center">
          <input
            {...props}
            id={switchId}
            type="checkbox"
            role="switch"
            disabled={disabled}
            aria-invalid={error ? true : props["aria-invalid"]}
            aria-describedby={describedBy || undefined}
            className="peer sr-only"
          />

          <span
            aria-hidden="true"
            className={`
              relative inline-block rounded-full
              bg-text-secondary/30
              transition-colors duration-200
              peer-checked:bg-primary
              peer-focus-visible:ring-2
              peer-focus-visible:ring-primary
              peer-focus-visible:ring-offset-2
              peer-disabled:opacity-70

              after:absolute after:left-0.5 after:top-0.5
              after:rounded-full after:bg-white
              after:shadow-sm after:content-['']
              after:transition-transform
              after:duration-200

              motion-reduce:transition-none
              motion-reduce:after:transition-none

              ${sizes[size]}
              ${error ? "ring-1 ring-error" : ""}
              ${className}
            `}
          />
        </div>
      </label>

      {error && (
        <div
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-error"
        >
          <CircleAlert size={14} className="shrink-0" aria-hidden="true" />

          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
