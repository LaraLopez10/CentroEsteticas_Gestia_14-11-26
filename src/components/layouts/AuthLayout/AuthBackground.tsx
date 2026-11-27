import type { ReactNode } from "react";

interface AuthBackgroundProps {
  children: ReactNode;
}

export default function AuthBackground({ children }: AuthBackgroundProps) {
  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-[#FAF7F2]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Degradado principal */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2] via-[#D4A5AF] to-[#591D35]" />

        {/* Forma superior derecha */}
        <div className="absolute -right-32 -top-32 size-[450px] rounded-full bg-[#EAD9C3]/80 blur-[100px] sm:size-[600px]" />

        {/* Forma inferior izquierda */}
        <div className="absolute -bottom-40 -left-32 size-[400px] rounded-full bg-[#823D53]/70 blur-[100px] sm:size-[550px]" />

        {/* Forma central */}
        <div className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A5AF]/70 blur-[100px] sm:size-[500px]" />

        {/* Reflejo de luz */}
        <div className="absolute left-1/4 top-0 h-[70%] w-[35%] rotate-45 rounded-full bg-white/20 blur-[100px]" />

        {/* Capa de suavizado */}
        <div className="absolute inset-0 bg-[#FAF7F2]/10" />
      </div>

      {children}
    </div>
  );
}
