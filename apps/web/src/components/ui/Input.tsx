import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  /** Helper text shown below the input when there is no error */
  hint?: string;
}

/**
 * Input — labeled text input with error and hint states.
 *
 * Usage:
 *   <Input label="Name" placeholder="Chapter name" autoFocus />
 *   <Input label="Email" type="email" error="Invalid address" />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id: idProp, className = "", ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    const describedBy = [
      error ? errorId : null,
      hint && !error ? hintId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={id}
            className="text-small font-medium text-neutral-700"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className={[
            // Base — matches reference exactly
            "w-full rounded-md border px-3 py-2 text-body text-neutral-900",
            "placeholder:text-neutral-400",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2",
            // Border + ring state
            error
              ? "border-danger-500 focus:ring-danger-400"
              : "border-neutral-300 focus:ring-neutral-400",
            // Disabled
            "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

        {error && (
          <p id={errorId} role="alert" className="text-small text-danger-600">
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={hintId} className="text-small text-neutral-500">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
export type { InputProps };
