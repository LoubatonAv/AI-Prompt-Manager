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
        className="input md:max-w-md"
      />

      <select
        value={categoryFilter}
        onChange={(e) =>
          setCategoryFilter(e.target.value as PromptCategory | "All")
        }
        className="input md:w-56"
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
