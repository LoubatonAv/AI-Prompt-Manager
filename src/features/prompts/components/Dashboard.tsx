import { useState } from "react";
import type { Prompt } from "../types";
import { usePrompts } from "../context/PromptsContext";
import SearchFilterBar from "./SearchFilterBar";
import PromptList from "./PromptList";
import PromptEditor from "./PromptEditor";
import PromptFormModal from "./PromptFormModal";

export default function Dashboard() {
  const { createPrompt, updatePrompt, isLoading } = usePrompts();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Prompt | null>(null);

  return (
    <div className="space-y-4 bg-white dark:bg-slate-950">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">Prompt Dashboard</h2>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="btn"
        >
          + New Prompt
        </button>
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
          if (editing) {
            await updatePrompt(editing.id, values);
          } else {
            await createPrompt(values);
          }
          setOpen(false);
        }}
      />
    </div>
  );
}
