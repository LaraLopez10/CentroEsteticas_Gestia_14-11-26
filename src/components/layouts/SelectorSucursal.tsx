import { Store, ChevronsUpDown } from "lucide-react";

export default function SelectorSucursal() {
  return (
    <div className="mx-3 mb-6 flex items-center gap-3 rounded-lg bg-primary-hover p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
        <Store size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-surface">Mi centro estético</p>

        <p className="truncate text-xs text-secondary">Sucursal principal</p>
      </div>

      <ChevronsUpDown size={15} className="shrink-0 text-secondary" />
    </div>
  );
}
