import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import Button from "./Button";
import Select from "./Select";

interface PaginacionProps {
  page: number;
  pageSize: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  disabled?: boolean;
  className?: string;
}

type PageItem = number | "start-ellipsis" | "end-ellipsis";

function getVisiblePages(page: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, "end-ellipsis", totalPages];
  }

  if (page >= totalPages - 3) {
    return [
      1,
      "start-ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "start-ellipsis",
    page - 1,
    page,
    page + 1,
    "end-ellipsis",
    totalPages,
  ];
}

export default function Paginacion({
  page,
  pageSize,
  totalRecords,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  disabled = false,
  className = "",
}: PaginacionProps) {
  const total = Math.max(0, totalRecords);
  const size = Math.max(1, pageSize);

  const totalPages = Math.max(1, Math.ceil(total / size));

  const currentPage = Math.min(Math.max(1, page), totalPages);

  const firstRecord = total === 0 ? 0 : (currentPage - 1) * size + 1;

  const lastRecord = Math.min(currentPage * size, total);

  const visiblePages = getVisiblePages(currentPage, totalPages);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const changePage = (nextPage: number) => {
    if (
      !disabled &&
      nextPage >= 1 &&
      nextPage <= totalPages &&
      nextPage !== currentPage
    ) {
      onPageChange(nextPage);
    }
  };

  return (
    <div
      className={`
        flex flex-col gap-4
        xl:flex-row xl:items-center xl:justify-between
        ${className}
      `}
    >
      <div className="flex flex-wrap items-center gap-4">
        <p aria-live="polite" className="text-xs text-text-secondary">
          Mostrando{" "}
          <span className="font-medium text-text-primary">
            {firstRecord}–{lastRecord}
          </span>{" "}
          de <span className="font-medium text-text-primary">{total}</span>{" "}
          registros
        </p>

        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-xs text-text-secondary">
              Filas por página
            </span>

            <Select
              aria-label="Filas por página"
              fullWidth={false}
              value={size}
              disabled={disabled}
              options={[...new Set([...pageSizeOptions, size])]
                .filter((option) => option > 0)
                .sort((a, b) => a - b)
                .map((option) => ({
                  value: option,
                  label: String(option),
                }))}
              onChange={(event) => onPageSizeChange(Number(event.target.value))}
              className="h-8 text-xs"
              containerClassName="w-20"
            />
          </div>
        )}
      </div>

      <nav
        aria-label="Paginación de registros"
        className="flex flex-wrap items-center justify-center gap-1"
      >
        <Button
          variant="ghost"
          size="icon"
          icon={ChevronsLeft}
          disabled={disabled || isFirstPage}
          onClick={() => changePage(1)}
          aria-label="Primera página"
          title="Primera página"
          className="h-8 w-8"
        />

        <Button
          variant="ghost"
          size="icon"
          icon={ChevronLeft}
          disabled={disabled || isFirstPage}
          onClick={() => changePage(currentPage - 1)}
          aria-label="Página anterior"
          title="Página anterior"
          className="h-8 w-8"
        />

        {visiblePages.map((item) =>
          typeof item === "number" ? (
            <Button
              key={item}
              variant={currentPage === item ? "primary" : "ghost"}
              size="sm"
              disabled={disabled}
              aria-current={currentPage === item ? "page" : undefined}
              aria-label={`Página ${item}`}
              onClick={() => changePage(item)}
              className="min-w-8 px-2"
            >
              {item}
            </Button>
          ) : (
            <span
              key={item}
              aria-hidden="true"
              className="flex h-8 w-6 items-center justify-center text-text-secondary"
            >
              …
            </span>
          ),
        )}

        <Button
          variant="ghost"
          size="icon"
          icon={ChevronRight}
          disabled={disabled || isLastPage}
          onClick={() => changePage(currentPage + 1)}
          aria-label="Página siguiente"
          title="Página siguiente"
          className="h-8 w-8"
        />

        <Button
          variant="ghost"
          size="icon"
          icon={ChevronsRight}
          disabled={disabled || isLastPage}
          onClick={() => changePage(totalPages)}
          aria-label="Última página"
          title="Última página"
          className="h-8 w-8"
        />
      </nav>
    </div>
  );
}
