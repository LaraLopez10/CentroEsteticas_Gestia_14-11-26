import { useId, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: TooltipPosition;
  disabled?: boolean;
  delay?: number;
  className?: string;
}

const positions: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

const arrows: Record<TooltipPosition, string> = {
  top: "left-1/2 top-full -translate-x-1/2 -translate-y-1/2",
  bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
  left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
  right: "right-full top-1/2 translate-x-1/2 -translate-y-1/2",
};

export default function Tooltip({
  children,
  content,
  position = "top",
  disabled = false,
  delay = 300,
  className = "",
}: TooltipProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const showTooltip = () => {
    if (disabled || !content) return;

    clearTimer();

    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    clearTimer();
    setVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVisible(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [visible]);

  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}

      <span
        id={id}
        role="tooltip"
        className={`
          pointer-events-none absolute z-50
          w-max max-w-60 rounded-md
          bg-text-primary px-3 py-2
          text-center font-sans text-xs
          font-medium text-white shadow-md
          transition-opacity duration-150
          motion-reduce:transition-none
          ${positions[position]}
          ${
            visible && !disabled && content
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
      >
        {content}

        <span
          aria-hidden="true"
          className={`
            absolute h-2 w-2 rotate-45 bg-text-primary
            ${arrows[position]}
          `}
        />
      </span>
    </span>
  );
}
