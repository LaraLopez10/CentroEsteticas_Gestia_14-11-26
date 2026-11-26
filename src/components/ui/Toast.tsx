import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, TriangleAlert, Info, X } from "lucide-react";

import Button from "./Button";

import type { ToastItem, ToastVariant } from "../../context/Toast/Toast.types";

interface ToastProps {
  toast: ToastItem;
  onClose: (id: string) => void;
}

const variants = {
  success: {
    icon: CheckCircle2,
    iconStyles: "bg-success/10 text-success",
    progressStyles: "bg-success",
  },
  error: {
    icon: XCircle,
    iconStyles: "bg-error/10 text-error",
    progressStyles: "bg-error",
  },
  warning: {
    icon: TriangleAlert,
    iconStyles: "bg-warning/15 text-warning",
    progressStyles: "bg-warning",
  },
  info: {
    icon: Info,
    iconStyles: "bg-info/10 text-info",
    progressStyles: "bg-info",
  },
} satisfies Record<
  ToastVariant,
  {
    icon: typeof Info;
    iconStyles: string;
    progressStyles: string;
  }
>;

export default function Toast({ toast, onClose }: ToastProps) {
  const { id, title, description, variant, duration } = toast;

  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);

  const config = variants[variant];
  const Icon = config.icon;

  const progress =
    duration > 0 ? Math.max(0, 100 - (elapsed / duration) * 100) : 100;

  useEffect(() => {
    if (paused || duration <= 0) return;

    const interval = window.setInterval(() => {
      setElapsed((previous) => previous + 50);
    }, 50);

    return () => window.clearInterval(interval);
  }, [paused, duration]);

  useEffect(() => {
    if (duration > 0 && elapsed >= duration) {
      onClose(id);
    }
  }, [elapsed, duration, id, onClose]);

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      aria-atomic="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
      className="
        pointer-events-auto w-full overflow-hidden
        rounded-card border border-border
        bg-surface shadow-lg
      "
    >
      <div className="flex items-start gap-3 p-4">
        <div
          className={`
            flex h-10 w-10 shrink-0 items-center
            justify-center rounded-button
            ${config.iconStyles}
          `}
        >
          <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="break-words text-sm font-semibold text-text-primary">
            {title}
          </p>

          {description && (
            <p className="mt-1 break-words text-xs leading-relaxed text-text-secondary">
              {description}
            </p>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          icon={X}
          aria-label="Cerrar notificación"
          onClick={() => onClose(id)}
          className="h-7 w-7 shrink-0"
        />
      </div>

      {duration > 0 && (
        <div aria-hidden="true" className="h-1 w-full bg-border/40">
          <div
            className={`
              h-full transition-[width] duration-75
              motion-reduce:transition-none
              ${config.progressStyles}
            `}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
