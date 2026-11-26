import { Search, X } from "lucide-react";
import Input from "./Input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Buscar registros...",
  disabled = false,
  fullWidth = true,
  className = "",
}: SearchInputProps) {
  return (
    <div
      className={`
        relative min-w-0
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      <Input
        type="text"
        icon={Search}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        aria-label={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="pr-10"
      />

      {value.length > 0 && !disabled && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
          title="Limpiar búsqueda"
          className="
            absolute right-2 top-1/2 flex h-7 w-7
            -translate-y-1/2 items-center justify-center
            rounded-md text-text-secondary
            transition-colors hover:bg-primary-light
            hover:text-primary
          "
        >
          <X size={16} strokeWidth={1.8} />
        </button>
      )}
    </div>
  );
}
