import { useRef, useState } from "react";
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
