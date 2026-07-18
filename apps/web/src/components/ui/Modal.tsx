import { useEffect, useRef } from "react";

interface ModalProps {
  /** Controls visibility — parent owns open/closed state */
  open: boolean;
  /** Called when the user clicks the backdrop or presses Escape */
  onClose: () => void;
  /** Modal heading, rendered as an <h2> */
  title: string;
  /** Max width of the panel. Defaults to "md" (max-w-md, matching reference modals) */
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Modal — backdrop + centered panel.
 *
 * Matches the exact pattern used in CreateChapterModal / CreatePageModal:
 *   fixed inset-0 z-50 flex items-center justify-center bg-black/40
 *   bg-white rounded-lg shadow-lg w-full max-w-md p-6
 *
 * Usage:
 *   <Modal open={open} onClose={close} title="New chapter">
 *     <form>…</form>
 *   </Modal>
 *
 * Children are responsible for the form/content and the action buttons.
 * Use the `ModalFooter` helper to get consistent button alignment.
 */
export default function Modal({ open, onClose, title, size = "md", children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus the first focusable element on open; restore focus on close
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    (firstFocusable ?? panelRef.current)?.focus();

    return () => {
      previouslyFocused?.focus();
    };
  }, [open]);

  // Close on Escape; cycle focus within the panel on Tab
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Prevent scroll on the body while open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  return (
    // Backdrop — matches "fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => {
        // Close only when clicking the backdrop itself, not the panel
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Panel — matches "bg-white rounded-lg shadow-lg w-full max-w-md p-6" */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={[
          "bg-white rounded-lg shadow-lg w-full p-6",
          "focus:outline-none",
          sizeClasses[size],
        ].join(" ")}
      >
        <h2
          id="modal-title"
          className="text-h3 text-neutral-900 mb-4"
        >
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}

/**
 * ModalFooter — right-aligned action buttons row.
 *
 * Matches the reference "flex justify-end gap-2 pt-2" pattern.
 *
 * Usage:
 *   <ModalFooter>
 *     <Button variant="ghost" onClick={onClose}>Cancel</Button>
 *     <Button variant="primary" type="submit">Create</Button>
 *   </ModalFooter>
 */
export function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      {children}
    </div>
  );
}
