import type { Prompt } from "../types";

type PromptCardProps = {
  prompt: Prompt;
};

export default function PromptCard({ prompt }: PromptCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 hover:border-slate-700 transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-100">{prompt.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{prompt.category}</p>
        </div>

        <span className="rounded-full border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-300">
          Prompt
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-slate-300">
        {prompt.template}
      </p>
    </div>
  );
}
