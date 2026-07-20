import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Neutral palette — primary surface and text colors
        neutral: {
          0: "#ffffff",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },

        // Accent — primary interactive color (warm brown, earthy and inviting)
        accent: {
          50: "#faf7f2",
          100: "#f5f0e8",
          200: "#e8dcc8",
          300: "#d9c7a8",
          400: "#c9a876",
          500: "#9d7e5c",   // primary accent - warm brown
          600: "#8b6d4f",   // hover
          700: "#6d5642",   // active / pressed
          800: "#5a4635",
          900: "#3e3228",
        },

        // Danger — destructive actions (matches reference red usage)
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
        },
      },

      // Typography scale
      fontSize: {
        // Headings
        h1: ["1.75rem", { lineHeight: "2.25rem", fontWeight: "700" }],  // text-[28px]
        h2: ["1.375rem", { lineHeight: "1.875rem", fontWeight: "600" }], // text-[22px]
        h3: ["1.125rem", { lineHeight: "1.75rem", fontWeight: "600" }],  // text-lg / modal titles
        h4: ["1rem",     { lineHeight: "1.5rem",  fontWeight: "600" }],  // text-base

        // Body
        body: ["0.875rem", { lineHeight: "1.375rem", fontWeight: "400" }], // text-sm — primary body
        small: ["0.75rem", { lineHeight: "1.125rem", fontWeight: "400" }], // text-xs — captions, meta
      },

      // Spacing scale (8-point grid)
      spacing: {
        "0.5": "0.125rem",  //  2px
        "1":   "0.25rem",   //  4px
        "1.5": "0.375rem",  //  6px
        "2":   "0.5rem",    //  8px
        "2.5": "0.625rem",  // 10px
        "3":   "0.75rem",   // 12px
        "3.5": "0.875rem",  // 14px
        "4":   "1rem",      // 16px
        "5":   "1.25rem",   // 20px
        "6":   "1.5rem",    // 24px
        "7":   "1.75rem",   // 28px
        "8":   "2rem",      // 32px
        "10":  "2.5rem",    // 40px
        "12":  "3rem",      // 48px
        "14":  "3.5rem",    // 56px
        "16":  "4rem",      // 64px
      },

      // Border radius
      borderRadius: {
        none: "0",
        sm: "0.25rem",   // 4px  — tight elements
        md: "0.375rem",  // 6px  — inputs, buttons (matches reference)
        lg: "0.5rem",    // 8px  — modals, cards (matches reference)
        xl: "0.75rem",   // 12px — larger panels
        full: "9999px",  // pills / avatars
      },

      // Box shadow — modal and card elevations
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", // matches modal shadow-lg
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
