import AppRoutes from "./routes/AppRoutes";
import ToastProvider from "../context/Toast/ToastProvider";

export default function App() {
  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  );
}
