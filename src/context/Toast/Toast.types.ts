export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
}

export interface ToastContextValue {
  showToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  success: (title: string, description?: string) => void;

  error: (title: string, description?: string) => void;

  warning: (title: string, description?: string) => void;

  info: (title: string, description?: string) => void;
}
