import { useState, useCallback, useMemo, useRef } from "react";

import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import Toast from "../../components/ui/Toast";
import { ToastContext } from "./ToastContext";

import type { ToastContextValue, ToastItem, ToastOptions } from "./Toast.types";

interface ToastProviderProps {
  children: ReactNode;
}

const MAX_TOASTS = 5;
const DEFAULT_DURATION = 5000;

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const showToast = useCallback((options: ToastOptions) => {
    const id = `toast-${++nextId.current}`;

    const newToast: ToastItem = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? "info",
      duration: options.duration ?? DEFAULT_DURATION,
    };

    setToasts((previous) => [...previous, newToast].slice(-MAX_TOASTS));

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({
      showToast,
      removeToast,
      clearToasts,

      success: (title, description) => {
        showToast({
          title,
          description,
          variant: "success",
        });
      },

      error: (title, description) => {
        showToast({
          title,
          description,
          variant: "error",
          duration: 8000,
        });
      },

      warning: (title, description) => {
        showToast({
          title,
          description,
          variant: "warning",
        });
      },

      info: (title, description) => {
        showToast({
          title,
          description,
          variant: "info",
        });
      },
    }),
    [showToast, removeToast, clearToasts],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      {typeof document !== "undefined" &&
        createPortal(
          <div
            aria-label="Notificaciones"
            role="region"
            className="
              pointer-events-none fixed
              bottom-4 right-4 z-[9999]
              flex w-[calc(100%-2rem)]
              max-w-sm flex-col gap-3
              sm:bottom-6 sm:right-6
            "
          >
            {toasts.map((toast) => (
              <Toast key={toast.id} toast={toast} onClose={removeToast} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}
