import { usePrompts } from "../context/PromptsContext";
import type { Prompt } from "../types";
import PromptCard from "./PromptCard";

type Props = {
  onEditPrompt: (p: Prompt) => void;
};

export default function PromptList({ onEditPrompt }: Props) {
  const {
    filteredPrompts,
    selectedPromptId,
    selectPrompt,
    deletePrompt,
    isLoading,
  } = usePrompts();

  if (filteredPrompts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 p-6 text-center">
        No prompts found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredPrompts.map((p) => (
        <PromptCard
          key={p.id}
          prompt={p}
          isActive={p.id === selectedPromptId}
          onSelect={() => selectPrompt(p.id)}
          onEdit={() => onEditPrompt(p)}
          onDelete={() => {
            if (isLoading) return;
            if (confirm(`Delete "${p.title}"?`)) deletePrompt(p.id);
          }}
        />
      ))}
    </div>
  );
}
