import { usePrompts } from "../context/PromptsContext";
import PromptCard from "./PromptCard";

export default function PromptList() {
  const { filteredPrompts } = usePrompts();

  if (filteredPrompts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center">
        <p className="text-slate-200 font-semibold">No prompts yet</p>
        <p className="mt-1 text-sm text-slate-400">
          Create your first prompt to start building your library.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {filteredPrompts.map((p) => (
        <PromptCard key={p.id} prompt={p} />
      ))}
    </div>
  );
}
