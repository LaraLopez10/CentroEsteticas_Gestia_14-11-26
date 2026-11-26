import { useId, useState } from "react";
import type { TextareaHTMLAttributes } from "react";
import { CircleAlert } from "lucide-react";

type Resize = "none" | "vertical" | "horizontal" | "both";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  showCounter?: boolean;
  resize?: Resize;
  containerClassName?: string;
}

const resizeStyles: Record<Resize, string> = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};

export default function Textarea({
  label,
  error,
  helperText,
  fullWidth = true,
  showCounter = false,
  resize = "vertical",
  containerClassName = "",
  className = "",
  rows = 4,
  id,
  required,
  disabled,
  maxLength,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const messageId = `${textareaId}-message`;
  const counterId = `${textareaId}-counter`;

  const [characterCount, setCharacterCount] = useState(
    String(defaultValue ?? "").length,
  );

  const count = value !== undefined ? String(value).length : characterCount;

  const describedBy = [
    props["aria-describedby"],
    error || helperText ? messageId : undefined,
    showCounter ? counterId : undefined,
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
          htmlFor={textareaId}
          className="font-sans text-sm font-medium text-text-primary"
        >
          {label}

          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}

      <textarea
        {...props}
        id={textareaId}
        rows={rows}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={describedBy || undefined}
        onChange={(event) => {
          setCharacterCount(event.target.value.length);
          onChange?.(event);
        }}
        className={`
          min-h-20 w-full min-w-0 rounded-input border
          bg-surface px-3 py-2.5 font-sans text-sm
          text-text-primary outline-none transition-colors
          placeholder:text-text-secondary/60
          disabled:cursor-not-allowed
          disabled:bg-background disabled:opacity-60
          ${resizeStyles[resize]}
          ${
            error
              ? "border-error focus:border-error focus:ring-2 focus:ring-error/15"
              : "border-border focus:border-primary focus:ring-2 focus:ring-primary/15"
          }
          ${className}
        `}
      />

      {(error || helperText || showCounter) && (
        <div className="flex flex-wrap items-start justify-between gap-2">
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

          {showCounter && (
            <span
              id={counterId}
              className={`ml-auto shrink-0 text-xs ${
                maxLength !== undefined && count >= maxLength
                  ? "text-warning"
                  : "text-text-secondary"
              }`}
            >
              {count}
              {maxLength !== undefined ? `/${maxLength}` : ""}
              {" caracteres"}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
