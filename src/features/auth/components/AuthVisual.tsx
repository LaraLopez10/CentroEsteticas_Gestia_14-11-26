export default function AuthVisual() {
  return (
    <div className="relative flex h-full min-h-[600px] flex-col overflow-hidden rounded-[2rem] bg-[#FAF7F2] p-5">
      {/* Esfera decorativa */}
      <div
        aria-hidden="true"
        className="absolute right-[-8%] top-1/2 size-[380px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_25%,#EAD9C3_0%,#D4A5AF_30%,#823D53_65%,#591D35_100%)] shadow-2xl"
      />

      {/* Panel de cristal */}
      <div className="relative z-10 flex h-full min-h-[560px] w-[60%] flex-col justify-between rounded-[1.5rem] border border-white/50 bg-white/20 p-8 backdrop-blur-2xl">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#823D53]">
            Tu espacio
          </span>

          <h2 className="mt-8 text-4xl font-medium leading-tight tracking-tight text-[#591D35] xl:text-5xl">
            Gestioná.
            <span className="block text-[#823D53]">Organizá.</span>
            <span className="block text-[#823D53]">Crecé.</span>
          </h2>
        </div>

        <div className="space-y-6">
          <p className="max-w-[200px] text-sm leading-relaxed text-[#591D35]">
            Todo tu centro de estética en un solo lugar.
          </p>

          <div className="h-px w-12 bg-[#823D53]/40" />

          <span className="text-xl font-semibold tracking-[0.3em] text-[#591D35]">
            GESTIA
          </span>
        </div>
      </div>

      {/* Texto superior derecho */}
      <div className="absolute right-8 top-10 text-right text-xs leading-relaxed text-[#823D53]">
        Belleza
        <span className="block">& gestión</span>
      </div>

      {/* Detalle inferior */}
      <span className="absolute bottom-10 right-8 text-[10px] uppercase tracking-widest text-[#823D53]">
        Tu negocio, en equilibrio.
      </span>
    </div>
  );
}
