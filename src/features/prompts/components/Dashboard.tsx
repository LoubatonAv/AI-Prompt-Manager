import { useEffect, useRef, useState } from "react";
import { usePrompts } from "../context/PromptsContext";
import type { Prompt } from "../types";
import SearchFilterBar from "./SearchFilterBar";
import PromptList from "./PromptList";
import PromptEditor from "./PromptEditor";
import PromptFormModal from "./PromptFormModal";

export default function Dashboard() {
  const {
    createPrompt,
    updatePrompt,
    exportPrompts,
    importPrompts,
    isLoading,
  } = usePrompts();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Prompt | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [loadingPrompts, setLoadingPrompts] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoadingPrompts(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (loadingPrompts) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Fetching Prompts…
        </div>
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900 dark:border-slate-700 dark:border-t-slate-100" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Prompt Dashboard</h2>

        <div className="flex gap-2">
          <button onClick={exportPrompts} className="btn cursor-pointer">
            Export
          </button>

          <button
            onClick={() => fileRef.current?.click()}
            className="btn cursor-pointer"
          >
            Import
          </button>

          <button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="btn-primary cursor-pointer"
          >
            + New Prompt
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) importPrompts(file);
              e.currentTarget.value = "";
            }}
          />
        </div>
      </div>

      <SearchFilterBar />

      <div className="grid gap-4 lg:grid-cols-2">
        <PromptList
          onEditPrompt={(p) => {
            setEditing(p);
            setOpen(true);
          }}
        />
        <PromptEditor />
      </div>

      <PromptFormModal
        open={open}
        mode={editing ? "edit" : "create"}
        initialPrompt={editing}
        isLoading={isLoading}
        onClose={() => setOpen(false)}
        onSubmit={async (values) => {
          const ok = editing
            ? await updatePrompt(editing.id, values)
            : await createPrompt(values);

          if (!ok) return;

          setOpen(false);
        }}
      />
    </div>
  );
}
