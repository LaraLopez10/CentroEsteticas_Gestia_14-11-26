import type { ReactNode } from "react";

interface NavGroupProps {
  title: string;
  children: ReactNode;
}

export default function NavGroup({ title, children }: NavGroupProps) {
  return (
    <div className="mb-6">
      <h2 className="mb-2 px-3 font-sans text-[10px] uppercase tracking-widest text-nav-rosa">
        {title}
      </h2>

      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
