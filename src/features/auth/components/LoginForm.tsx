import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  LoaderCircle,
  CircleAlert,
} from "lucide-react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import type { LoginRequest } from "../types/login.types";

interface LoginFormProps {
  onLogin?: (data: LoginRequest) => Promise<void>;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const {
    register,
    errors,
    isLoading,
    showPassword,
    togglePassword,
    error,
    handleSubmit,
  } = useLogin({ onLogin });

  return (
    <div className="mx-auto w-full max-w-md">
      <header className="mb-10 flex items-center justify-between">
        <span className="text-2xl font-semibold tracking-[0.25em] text-[#591D35]">
          GESTIA
        </span>

        <span className="text-xs text-[#823D53]">Acceso al sistema</span>
      </header>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[#591D35] sm:text-4xl">
          ¡Bienvenida!
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-[#823D53]">
          Ingresá a tu espacio de gestión y continuá haciendo crecer tu negocio.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[#591D35]">
            Correo electrónico
          </label>

          <div className="relative">
            <Mail
              size={18}
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#823D53]"
            />

            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="nombre@correo.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              disabled={isLoading}
              {...register("email")}
              className={`h-12 w-full rounded-xl border bg-white/60 pl-12 pr-4 text-sm text-[#591D35] outline-none transition placeholder:text-[#823D53]/60 focus:ring-2 focus:ring-[#823D53]/20 ${
                errors.email
                  ? "border-red-500"
                  : "border-[#D4A5AF]/50 focus:border-[#823D53]"
              }`}
            />
          </div>

          {errors.email && (
            <p id="email-error" className="text-xs text-red-700">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[#591D35]"
          >
            Contraseña
          </label>

          <div className="relative">
            <LockKeyhole
              size={18}
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#823D53]"
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Ingresá tu contraseña"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              disabled={isLoading}
              {...register("password")}
              className={`h-12 w-full rounded-xl border bg-white/60 pl-12 pr-14 text-sm text-[#591D35] outline-none transition placeholder:text-[#823D53]/60 focus:ring-2 focus:ring-[#823D53]/20 ${
                errors.password
                  ? "border-red-500"
                  : "border-[#D4A5AF]/50 focus:border-[#823D53]"
              }`}
            />

            <button
              type="button"
              onClick={togglePassword}
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              aria-pressed={showPassword}
              className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg text-[#823D53] transition hover:bg-[#D4A5AF]/20 focus-visible:outline-2 focus-visible:outline-[#591D35]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p id="password-error" className="text-xs text-red-700">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-[#591D35]">
            <input
              type="checkbox"
              disabled={isLoading}
              {...register("rememberMe")}
              className="size-4 cursor-pointer accent-[#591D35]"
            />
            Recordarme
          </label>

          <Link
            to="/forgot-password"
            className="text-xs font-medium text-[#823D53] transition hover:text-[#591D35] hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"
          >
            <CircleAlert size={16} className="shrink-0" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-full bg-[#591D35] text-sm font-medium text-[#FAF7F2] shadow-lg shadow-[#591D35]/15 transition hover:bg-[#823D53] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#591D35] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              Ingresando...
            </>
          ) : (
            <>
              Iniciar sesión
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <footer className="mt-10 border-t border-[#D4A5AF]/40 pt-5 text-center">
        <p className="text-xs text-[#823D53]">
          Gestia · Tu espacio para crecer.
        </p>
      </footer>
    </div>
  );
}
