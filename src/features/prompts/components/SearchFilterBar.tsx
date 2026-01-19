import { usePrompts } from "../context/PromptsContext";
import type { PromptCategory } from "../types";

const CATEGORIES: (PromptCategory | "All")[] = [
  "All",
  "Coding",
  "Writing",
  "Marketing",
  "Other",
];

export default function SearchFilterBar() {
  const { search, setSearch, categoryFilter, setCategoryFilter } = usePrompts();

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search prompts..."
        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 placeholder:text-slate-500 outline-none focus:border-slate-600 md:max-w-md"
      />

      <select
        value={categoryFilter}
        onChange={(e) =>
          setCategoryFilter(e.target.value as PromptCategory | "All")
        }
        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-slate-600 md:w-56"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
