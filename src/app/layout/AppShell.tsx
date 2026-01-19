import React from "react";
import { useTheme } from "../../global/hooks/useTheme";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="font-semibold">AI Prompt Manager</div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="btn cursor-pointer transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
