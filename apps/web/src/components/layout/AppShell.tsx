import type { ReactNode } from "react";

interface AppShellProps {
  /** The active user's display name, shown in the user menu placeholder */
  userName?: string;
  /** Route content — render your <Routes> or page component here */
  children: ReactNode;
}

/**
 * AppShell — persistent chrome wrapping all route content.
 *
 * Layout:
 *   ┌─────────────────────────────────────┐
 *   │ Header (fixed top, full-width)       │
 *   │  [Sumi logo]          [User menu]   │
 *   ├─────────────────────────────────────┤
 *   │                                     │
 *   │  <children>  (scrollable body)      │
 *   │                                     │
 *   └─────────────────────────────────────┘
 *
 * Wiring into your routes file:
 *
 *   // Option A — wrap the router outlet
 *   <AppShell userName={user?.name}>
 *     <Outlet />
 *   </AppShell>
 *
 *   // Option B — wrap at the route level
 *   <Route element={<AppShell userName={user?.name}><Outlet /></AppShell>}>
 *     <Route path="/" element={<Dashboard />} />
 *     <Route path="/projects/:id" element={<ProjectPage />} />
 *   </Route>
 *
 * The shell adds `pt-14` to the main content area to clear the fixed header
 * (height is 56px / h-14). If you add a sub-nav bar, increase this offset.
 *
 * Props:
 *   userName  — display name shown in the user menu button. Pass the
 *               authenticated user's name here; leave undefined to show
 *               a generic "Account" label while auth is loading.
 *   children  — the routed page content.
 */
export default function AppShell({ userName, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header userName={userName} />
      <main className="pt-14">{children}</main>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

interface HeaderProps {
  userName?: string;
}

function Header({ userName }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-14 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo — left */}
        <Logo />

        {/* User menu — right */}
        <UserMenuPlaceholder userName={userName} />
      </div>
    </header>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <a
      href="/"
      aria-label="Sumi — go to home"
      className="flex items-center gap-2 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-sm"
    >
      {/* Wordmark SVG — replace with your actual logo asset */}
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Simple ink-brush mark placeholder */}
        <rect width="24" height="24" rx="4" fill="#111827" />
        <path
          d="M7 17V9.5C7 8.12 8.12 7 9.5 7H14.5C15.88 7 17 8.12 17 9.5C17 10.88 15.88 12 14.5 12H9.5"
          stroke="white"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-body font-semibold text-neutral-900 tracking-tight">
        Sumi
      </span>
    </a>
  );
}

// ─── User menu placeholder ────────────────────────────────────────────────────

interface UserMenuPlaceholderProps {
  userName?: string;
}

/**
 * UserMenuPlaceholder — static trigger button for the user dropdown.
 *
 * Replace with a real Dropdown/Popover when auth is wired up.
 * The button is keyboard-accessible and has `aria-haspopup="menu"` so
 * screen readers know it opens a menu once implemented.
 */
function UserMenuPlaceholder({ userName }: UserMenuPlaceholderProps) {
  const initials = getInitials(userName);
  const label = userName ?? "Account";

  return (
    <button
      type="button"
      aria-label={`User menu — ${label}`}
      aria-haspopup="menu"
      className={[
        "flex items-center gap-2 rounded-md px-2 py-1.5",
        "text-small text-neutral-600",
        "hover:bg-neutral-100 hover:text-neutral-900",
        "transition-colors duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
      ].join(" ")}
    >
      {/* Avatar circle */}
      <span
        aria-hidden="true"
        className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-small font-medium text-neutral-700 shrink-0"
      >
        {initials}
      </span>

      {/* Name — hidden on small screens */}
      <span className="hidden sm:block max-w-[120px] truncate">{label}</span>

      {/* Chevron */}
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 text-neutral-400"
      >
        <path
          d="M3.5 5.25L7 8.75L10.5 5.25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Derive 1–2 uppercase initials from a display name. Falls back to "?" */
function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
