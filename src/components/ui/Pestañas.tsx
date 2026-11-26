import { useId, useRef, useState } from "react";
import type { ReactNode, KeyboardEvent } from "react";
import type { LucideIcon } from "lucide-react";

type TabVariant = "underline" | "pills" | "segmented";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: LucideIcon;
  count?: number;
  disabled?: boolean;
}

interface PestañasProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  variant?: TabVariant;
  fullWidth?: boolean;
  keepMounted?: boolean;
  className?: string;
  contentClassName?: string;
  ariaLabel?: string;
}

const containerStyles: Record<TabVariant, string> = {
  underline: "border-b border-border",
  pills: "gap-2",
  segmented: "gap-1 rounded-button bg-border/50 p-1",
};

const activeStyles: Record<TabVariant, string> = {
  underline: "border-primary text-primary",
  pills: "bg-primary text-white",
  segmented: "bg-surface text-primary shadow-sm",
};

const inactiveStyles: Record<TabVariant, string> = {
  underline: "border-transparent text-text-secondary hover:text-primary",
  pills: "text-text-secondary hover:bg-primary-light hover:text-primary",
  segmented: "text-text-secondary hover:text-primary",
};

export default function Pestañas({
  items,
  value,
  defaultValue,
  onChange,
  variant = "underline",
  fullWidth = false,
  keepMounted = false,
  className = "",
  contentClassName = "",
  ariaLabel = "Secciones",
}: PestañasProps) {
  const baseId = useId();

  const tabsRef = useRef<Record<string, HTMLButtonElement | null>>({});

  const [localValue, setLocalValue] = useState(
    defaultValue ?? items.find((item) => !item.disabled)?.id ?? "",
  );

  const selectedValue = value ?? localValue;

  const activeId =
    items.find((item) => item.id === selectedValue && !item.disabled)?.id ??
    items.find((item) => !item.disabled)?.id ??
    "";

  const changeTab = (id: string) => {
    const item = items.find((tab) => tab.id === id);

    if (!item || item.disabled || id === activeId) {
      return;
    }

    if (value === undefined) {
      setLocalValue(id);
    }

    onChange?.(id);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    id: string,
  ) => {
    const enabledItems = items.filter((item) => !item.disabled);

    if (enabledItems.length === 0) return;

    const index = enabledItems.findIndex((item) => item.id === id);

    if (index === -1) return;

    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % enabledItems.length;
        break;

      case "ArrowLeft":
        nextIndex = (index - 1 + enabledItems.length) % enabledItems.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = enabledItems.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();

    const nextId = enabledItems[nextIndex].id;

    changeTab(nextId);
    tabsRef.current[nextId]?.focus();
  };

  return (
    <div className={`flex w-full min-w-0 flex-col ${className}`}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        className={`
          flex min-w-0 items-center overflow-x-auto
          ${containerStyles[variant]}
        `}
      >
        {items.map((item) => {
          const isActive = activeId === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              ref={(element) => {
                tabsRef.current[item.id] = element;
              }}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => changeTab(item.id)}
              onKeyDown={(event) => handleKeyDown(event, item.id)}
              className={`
                inline-flex shrink-0 items-center
                justify-center gap-2 whitespace-nowrap
                px-4 py-3 font-sans text-sm font-medium
                transition-colors duration-200
                disabled:cursor-not-allowed
                disabled:opacity-40

                ${fullWidth ? "flex-1" : ""}

                ${variant === "underline" ? "border-b-2" : "rounded-button"}

                ${isActive ? activeStyles[variant] : inactiveStyles[variant]}
              `}
            >
              {Icon && (
                <Icon
                  size={17}
                  strokeWidth={1.7}
                  aria-hidden="true"
                  className="shrink-0"
                />
              )}

              {item.label}

              {item.count !== undefined && (
                <span className="rounded-full bg-current/10 px-2 py-0.5 text-[10px]">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {items.map((item) => {
        const isActive = activeId === item.id;

        return (
          <div
            key={item.id}
            id={`${baseId}-panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${item.id}`}
            hidden={!isActive}
            tabIndex={0}
            className={`min-w-0 pt-5 ${contentClassName}`}
          >
            {(isActive || keepMounted) && item.content}
          </div>
        );
      })}
    </div>
  );
}
