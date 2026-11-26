import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";
import Button from "./Button";

type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const sizes: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  "2xl": "max-w-6xl",
  full: "max-w-none",
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  icon: Icon,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = "",
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const generatedId = useId();
  const titleId = `${generatedId}-title`;
  const descriptionId = `${generatedId}-description`;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault();

        if (closeOnEscape) {
          onClose();
        }
      }}
      onClick={(event) => {
        if (closeOnOverlay && event.target === event.currentTarget) {
          onClose();
        }
      }}
      className={`
        fixed inset-0 m-auto
        max-h-[calc(100dvh-2rem)]
        w-[calc(100%-2rem)]
        overflow-hidden rounded-card
        border border-border bg-surface
        p-0 text-text-primary shadow-2xl
        backdrop:bg-black/40
        ${sizes[size]}
        ${className}
      `}
    >
      <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
        {/* Encabezado */}
        <header className="flex shrink-0 items-start gap-3 border-b border-border px-5 py-4 sm:px-6">
          {Icon && (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-button bg-primary-light text-primary">
              <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="font-display text-2xl text-primary">
              {title}
            </h2>

            {description && (
              <p
                id={descriptionId}
                className="mt-1 text-sm text-text-secondary"
              >
                {description}
              </p>
            )}
          </div>

          {showCloseButton && (
            <Button
              variant="ghost"
              size="icon"
              icon={X}
              onClick={onClose}
              aria-label="Cerrar modal"
              title="Cerrar"
            />
          )}
        </header>

        {/* Contenido */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
          {children}
        </div>

        {/* Pie de acciones */}
        {footer && (
          <footer className="flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-border px-5 py-4 sm:px-6">
            {footer}
          </footer>
        )}
      </div>
    </dialog>
  );
}
