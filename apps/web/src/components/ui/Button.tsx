import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  // Matches the reference "bg-gray-900 text-white" pattern exactly
  primary:
    "bg-neutral-900 text-white hover:bg-neutral-700 focus-visible:ring-neutral-900 disabled:opacity-50",
  secondary:
    "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 focus-visible:ring-neutral-400 disabled:opacity-50",
  danger:
    "text-danger-600 hover:text-danger-800 focus-visible:ring-danger-500 disabled:opacity-40",
  ghost:
    "text-neutral-600 hover:text-neutral-900 focus-visible:ring-neutral-400 disabled:opacity-40",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-small rounded-md",
  md: "px-4 py-2 text-body rounded-md",
};

/**
 * Button — base interactive primitive.
 *
 * Usage:
 *   <Button variant="primary">Save</Button>
 *   <Button variant="danger" size="sm" loading={saving}>Delete</Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        className={[
          // Base
          "inline-flex items-center justify-center font-medium",
          "transition-colors duration-150",
          // Focus ring — keyboard accessible, not shown on mouse click
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          // Cursor
          "disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading ? (
          <>
            {/* Minimal spinner — no dependency on an icon library */}
            <svg
              aria-hidden="true"
              className="mr-2 h-3.5 w-3.5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
export type { ButtonProps, ButtonVariant, ButtonSize };
