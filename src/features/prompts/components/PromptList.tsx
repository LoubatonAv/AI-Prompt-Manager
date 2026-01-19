import type { Prompt } from "../types";
import { usePrompts } from "../context/PromptsContext";
import PromptCard from "./PromptCard";

type Props = {
  onEditPrompt: (prompt: Prompt) => void;
};

export default function PromptList({ onEditPrompt }: Props) {
  const { filteredPrompts, deletePrompt, isLoading } = usePrompts();

  if (filteredPrompts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center">
        <p className="font-semibold text-slate-200">No prompts found</p>
        <p className="mt-1 text-sm text-slate-400">
          Try a different search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {filteredPrompts.map((p) => (
        <PromptCard
          key={p.id}
          prompt={p}
          onEdit={() => onEditPrompt(p)}
          onDelete={() => {
            if (isLoading) return;
            const ok = confirm(`Delete "${p.title}"?`);
            if (!ok) return;
            deletePrompt(p.id);
          }}
        />
      ))}
    </div>
  );
}
