import type { HTMLAttributes, CSSProperties } from "react";

type SkeletonVariant = "text" | "rectangular" | "circular" | "rounded";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  animated?: boolean;
}

const variants: Record<SkeletonVariant, string> = {
  text: "h-3 w-full rounded",
  rectangular: "h-12 w-full rounded-none",
  circular: "h-10 w-10 rounded-full",
  rounded: "h-12 w-full rounded-button",
};

export default function Skeleton({
  variant = "rounded",
  width,
  height,
  animated = true,
  className = "",
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      {...props}
      aria-hidden="true"
      style={{
        width,
        height,
        ...style,
      }}
      className={`
        shrink-0 bg-border/70
        ${variants[variant]}
        ${animated ? "animate-pulse motion-reduce:animate-none" : ""}
        ${className}
      `}
    />
  );
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 3, className = "" }: SkeletonTextProps) {
  return (
    <div aria-hidden="true" className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? "65%" : "100%"}
        />
      ))}
    </div>
  );
}

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = "" }: SkeletonCardProps) {
  return (
    <div
      aria-hidden="true"
      className={`
        flex flex-col gap-4 rounded-card
        border border-border bg-surface p-5
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width="55%" />

        <Skeleton variant="rounded" width={40} height={40} />
      </div>

      <Skeleton variant="rounded" width="60%" height={30} />

      <Skeleton variant="text" width="75%" />
    </div>
  );
}

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  selectable?: boolean;
}

export function SkeletonTable({
  rows = 5,
  columns = 4,
  selectable = false,
}: SkeletonTableProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, row) => (
        <tr key={row} aria-hidden="true">
          {selectable && (
            <td className="px-4 py-3.5">
              <Skeleton width={16} height={16} />
            </td>
          )}

          {Array.from({ length: columns }, (_, column) => (
            <td key={column} className="px-4 py-3.5">
              <Skeleton variant="text" width={column === 0 ? "90%" : "70%"} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

interface SkeletonFormProps {
  fields?: number;
  columns?: 1 | 2 | 3;
  className?: string;
}

const formColumns = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export function SkeletonForm({
  fields = 6,
  columns = 2,
  className = "",
}: SkeletonFormProps) {
  return (
    <div
      aria-hidden="true"
      className={`
        grid gap-4
        ${formColumns[columns]}
        ${className}
      `}
    >
      {Array.from({ length: fields }, (_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton variant="text" width="35%" />

          <Skeleton height={40} />
        </div>
      ))}
    </div>
  );
}
