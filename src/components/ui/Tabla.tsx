import type { ReactNode } from "react";
import { Inbox, LoaderCircle } from "lucide-react";
import Checkbox from "./Checkbox";

type RowKey = string | number;
type ColumnAlign = "left" | "center" | "right";

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  align?: ColumnAlign;
  width?: string;
  className?: string;
}

interface TablaProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => RowKey;
  loading?: boolean;
  emptyMessage?: string;
  emptyDescription?: string;
  selectable?: boolean;
  selectedRows?: RowKey[];
  onSelectionChange?: (rows: RowKey[]) => void;
  className?: string;
}

const alignStyles: Record<ColumnAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function Tabla<T>({
  columns,
  data,
  rowKey,
  loading = false,
  emptyMessage = "No hay registros",
  emptyDescription = "Todavía no hay información para mostrar.",
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  className = "",
}: TablaProps<T>) {
  const selectedSet = new Set(selectedRows);
  const visibleKeys = data.map(rowKey);

  const allSelected =
    data.length > 0 && visibleKeys.every((key) => selectedSet.has(key));

  const someSelected =
    visibleKeys.some((key) => selectedSet.has(key)) && !allSelected;

  const toggleAll = () => {
    const next = new Set(selectedRows);

    visibleKeys.forEach((key) => {
      if (allSelected) {
        next.delete(key);
      } else {
        next.add(key);
      }
    });

    onSelectionChange?.([...next]);
  };

  const toggleRow = (key: RowKey) => {
    const next = new Set(selectedRows);

    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }

    onSelectionChange?.([...next]);
  };

  const columnCount = columns.length + (selectable ? 1 : 0);

  return (
    <div className={`w-full min-w-0 overflow-x-auto ${className}`}>
      <table
        aria-busy={loading}
        className="w-full border-collapse font-sans text-sm"
      >
        <thead className="border-b border-border bg-background">
          <tr>
            {selectable && (
              <th scope="col" className="w-12 px-4 py-3">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={toggleAll}
                  disabled={loading || data.length === 0 || !onSelectionChange}
                  aria-label="Seleccionar todos los registros"
                />
              </th>
            )}

            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                style={{ width: column.width }}
                className={`
                  whitespace-nowrap px-4 py-3.5
                  text-xs font-semibold text-text-secondary
                  ${alignStyles[column.align ?? "left"]}
                `}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-border bg-surface">
          {loading ? (
            <tr>
              <td colSpan={columnCount} className="px-4 py-16">
                <div role="status" className="flex flex-col items-center gap-3">
                  <LoaderCircle
                    size={28}
                    className="animate-spin text-primary motion-reduce:animate-none"
                  />

                  <span className="text-sm text-text-secondary">
                    Cargando registros...
                  </span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columnCount} className="px-4 py-16">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
                    <Inbox
                      size={26}
                      strokeWidth={1.5}
                      className="text-primary"
                    />
                  </div>

                  <h3 className="font-display text-xl text-primary">
                    {emptyMessage}
                  </h3>

                  <p className="text-sm text-text-secondary">
                    {emptyDescription}
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row) => {
              const key = rowKey(row);
              const selected = selectedSet.has(key);

              return (
                <tr
                  key={key}
                  className={`
                    transition-colors
                    ${
                      selectable && selected
                        ? "bg-primary-light/50"
                        : "hover:bg-background"
                    }
                  `}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selected}
                        onChange={() => toggleRow(key)}
                        disabled={!onSelectionChange}
                        aria-label={`Seleccionar registro ${key}`}
                      />
                    </td>
                  )}

                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`
                        px-4 py-3.5 align-middle
                        text-text-primary
                        ${alignStyles[column.align ?? "left"]}
                        ${column.className ?? ""}
                      `}
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
