import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  loginDefaultValues,
  type LoginFormValues,
} from "../schemas/login.schemas";
import type { LoginRequest } from "../types/login.types";

interface UseLoginProps {
  onLogin?: (data: LoginRequest) => Promise<void>;
}

export default function useLogin({ onLogin }: UseLoginProps = {}) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);

    if (!onLogin) {
      setError("El servicio de autenticación aún no está disponible.");
      return;
    }

    try {
      await onLogin(data);
    } catch {
      setError(
        "No se pudo iniciar sesión. Verificá tus datos e intentá nuevamente.",
      );
    }
  };

  return {
    register: form.register,
    control: form.control,
    errors: form.formState.errors,
    isLoading: form.formState.isSubmitting,
    isValid: form.formState.isValid,
    showPassword,
    togglePassword,
    error,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}
