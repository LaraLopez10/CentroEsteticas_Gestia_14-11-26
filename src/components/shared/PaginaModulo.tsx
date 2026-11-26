import type { ReactNode } from "react";

interface PaginaModuloProps {
  children: ReactNode;
  className?: string;
}

export default function PaginaModulo({
  children,
  className = "",
}: PaginaModuloProps) {
  return (
    <section
      className={`mx-auto flex w-full min-w-0 flex-col gap-6 ${className}`}
    >
      {children}
    </section>
  );
}
