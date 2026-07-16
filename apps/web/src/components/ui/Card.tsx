import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** When true, renders as a button element so the whole card is clickable */
  onClick?: () => void;
}

/**
 * Card — list-item style surface.
 *
 * Matches the pattern from PageGrid:
 *   border border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50
 * and ProjectHeader's containing surface.
 *
 * Usage:
 *   <Card>
 *     <CardHeader title="Chapter 1" meta="12 pages" />
 *     <CardBody>…</CardBody>
 *     <CardActions>…</CardActions>
 *   </Card>
 *
 *   // Clickable card
 *   <Card onClick={() => navigate(`/chapters/${id}`)}>…</Card>
 */
export default function Card({ children, className = "", onClick }: CardProps) {
  const base = [
    "relative border border-neutral-200 rounded-lg p-4 bg-white",
    "transition-colors duration-150",
    onClick
      ? "hover:bg-neutral-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        // w-full + text-left reset browser button defaults so card fills its grid cell
        className={["w-full text-left", base].join(" ")}
      >
        {children}
      </button>
    );
  }

  return <div className={base}>{children}</div>;
}

// ─── Subcomponents ───────────────────────────────────────────────────────────

interface CardHeaderProps {
  title: string;
  /** Optional right-side element (e.g. a badge or action menu) */
  action?: ReactNode;
  /** Small secondary line below the title */
  meta?: string;
}

/**
 * CardHeader — title + optional meta line + optional right-side action.
 *
 * Matches the ProjectHeader pattern (title left, controls right).
 */
export function CardHeader({ title, meta, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="min-w-0">
        <p className="text-body font-medium text-neutral-800 truncate">{title}</p>
        {meta && (
          <p className="text-small text-neutral-500 mt-0.5">{meta}</p>
        )}
      </div>
      {action && (
        <div className="ml-3 shrink-0 flex items-center gap-2">{action}</div>
      )}
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

/** CardBody — optional content area below the header, with top spacing. */
export function CardBody({ children, className = "" }: CardBodyProps) {
  return (
    <div className={["mt-2", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

interface CardActionsProps {
  children: ReactNode;
}

/** CardActions — bottom-aligned row for destructive / secondary actions. Matches PageGrid delete row. */
export function CardActions({ children }: CardActionsProps) {
  return (
    <div className="mt-3 flex items-center gap-2">
      {children}
    </div>
  );
}

// ─── Empty state card ─────────────────────────────────────────────────────────

interface CardEmptyProps {
  message: string;
  action?: ReactNode;
}

/**
 * CardEmpty — dashed placeholder matching the PageGrid empty state.
 *
 *   border border-dashed border-gray-300 rounded-lg p-8 text-center
 */
export function CardEmpty({ message, action }: CardEmptyProps) {
  return (
    <div className="border border-dashed border-neutral-300 rounded-lg p-8 text-center">
      <p className="text-small text-neutral-400">{message}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
