import { useMemo, useState } from "react";
import { usePrompts } from "../context/PromptsContext";
import type { Prompt } from "../types";
import SearchFilterBar from "./SearchFilterBar";
import PromptList from "./PromptList";
import PromptFormModal from "./PromptFormModal";

export default function Dashboard() {
  const { prompts, isLoading, createPrompt, updatePrompt } = usePrompts();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editing, setEditing] = useState<Prompt | null>(null);

  const editingFresh = useMemo(() => {
    if (!editing) return null;
    return prompts.find((p) => p.id === editing.id) ?? editing;
  }, [prompts, editing]);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Prompt Dashboard</h2>
          <p className="text-sm text-slate-400">
            Browse and manage your saved prompts.
          </p>
        </div>

        <button
          onClick={() => {
            setMode("create");
            setEditing(null);
            setOpen(true);
          }}
          className="rounded-lg border border-slate-700 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-white"
        >
          + New Prompt
        </button>
      </div>

      <SearchFilterBar />

      {isLoading && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
          Loading...
        </div>
      )}

      <PromptList
        onEditPrompt={(p) => {
          setMode("edit");
          setEditing(p);
          setOpen(true);
        }}
      />

      <PromptFormModal
        open={open}
        mode={mode}
        initialPrompt={editingFresh}
        isLoading={isLoading}
        onClose={() => setOpen(false)}
        onSubmit={async (values) => {
          if (mode === "create") {
            await createPrompt(values);
            setOpen(false);
            return;
          }
          if (editingFresh) {
            await updatePrompt(editingFresh.id, values);
            setOpen(false);
          }
        }}
      />
    </div>
  );
}
