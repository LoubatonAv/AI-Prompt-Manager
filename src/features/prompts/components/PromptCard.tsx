import type { Prompt } from "../types";

type Props = {
  prompt: Prompt;
  onEdit: () => void;
  onDelete: () => void;
};

export default function PromptCard({ prompt, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 hover:border-slate-700 transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{prompt.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{prompt.category}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-300">{prompt.template}</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onEdit}
          className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-sm hover:border-slate-700"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-sm hover:border-slate-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
