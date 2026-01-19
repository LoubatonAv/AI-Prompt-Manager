import { useEffect, useState } from "react";
import type { Prompt, PromptCategory } from "../types";
import Modal from "./Modal";

type Mode = "create" | "edit";

type Values = {
  title: string;
  category: PromptCategory;
  template: string;
};

const CATEGORIES: PromptCategory[] = [
  "Coding",
  "Writing",
  "Marketing",
  "Other",
];

type Props = {
  open: boolean;
  mode: Mode;
  initialPrompt?: Prompt | null;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (values: Values) => void;
};

export default function PromptFormModal({
  open,
  mode,
  initialPrompt,
  isLoading,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<PromptCategory>("Writing");
  const [template, setTemplate] = useState("");

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialPrompt) {
      setTitle(initialPrompt.title);
      setCategory(initialPrompt.category);
      setTemplate(initialPrompt.template);
    } else {
      setTitle("");
      setCategory("Writing");
      setTemplate("");
    }
  }, [open, mode, initialPrompt]);

  const canSubmit =
    title.trim().length > 0 && template.trim().length > 0 && !isLoading;

  return (
    <Modal
      open={open}
      title={mode === "create" ? "New Prompt" : "Edit Prompt"}
      onClose={isLoading ? () => {} : onClose}
    >
      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 outline-none focus:border-slate-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as PromptCategory)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 outline-none focus:border-slate-600"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            Template
          </label>
          <textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            rows={5}
            className="w-full resize-none rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 outline-none focus:border-slate-600"
          />
          <p className="mt-1 text-xs text-slate-500">
            Use variables like {"{topic}"}.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm hover:border-slate-700 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit({ title, category, template })}
            disabled={!canSubmit}
            className="rounded-lg border border-slate-700 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-white disabled:opacity-50"
          >
            {isLoading ? "Saving..." : mode === "create" ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
