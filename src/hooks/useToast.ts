import { useContext } from "react";
import { ToastContext } from "../context/Toast/ToastContext";

export default function useToast() {
  const context = useContext(ToastContext);

  if (context === null) {
    throw new Error("useToast debe usarse dentro de ToastProvider.");
  }

  return context;
}
