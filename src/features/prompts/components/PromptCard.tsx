import type { Prompt } from "../types";

type Props = {
  prompt: Prompt;
  isActive: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function PromptCard({
  prompt,
  isActive,
  onSelect,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className={`rounded-xl border bg-white dark:bg-slate-900 p-4 transition ${
        isActive
          ? "border-slate-500"
          : "border-slate-200 dark:border-slate-800 hover:border-slate-700"
      }`}
    >
      <button onClick={onSelect} className="block w-full text-left">
        <h3 className="font-semibold">{prompt.title}</h3>
        <p className="mt-1 text-sm text-slate-400">{prompt.category}</p>
        <p className="mt-2 text-sm text-slate-300">{prompt.template}</p>
      </button>

      <div className="mt-4 flex gap-2">
        <button onClick={onEdit} className="btn-secondary">
          Edit
        </button>
        <button onClick={onDelete} className="btn-secondary">
          Delete
        </button>
      </div>
    </div>
  );
}
