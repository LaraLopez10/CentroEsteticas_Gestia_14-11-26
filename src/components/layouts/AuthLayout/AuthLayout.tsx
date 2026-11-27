import type { ReactNode } from "react";
import AuthBackground from "./AuthBackground";

interface AuthLayoutProps {
  children: ReactNode;
  visual?: ReactNode;
}

export default function AuthLayout({ children, visual }: AuthLayoutProps) {
  return (
    <AuthBackground>
      <main className="relative z-10 flex min-h-dvh w-full items-center justify-center p-4 sm:p-6 lg:p-10">
        <div
          className={`grid w-full max-w-6xl gap-4 lg:gap-6 ${
            visual ? "lg:grid-cols-2" : "max-w-lg"
          }`}
        >
          <section className="flex min-w-0 flex-col justify-center rounded-[2rem] border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-xl sm:p-10 lg:p-12">
            {children}
          </section>

          {visual && (
            <aside
              aria-hidden="true"
              className="relative hidden min-h-[600px] overflow-hidden rounded-[2rem] lg:block"
            >
              {visual}
            </aside>
          )}
        </div>
      </main>
    </AuthBackground>
  );
}
