import React, { createContext, useContext, useMemo, useState } from "react";
import type { Prompt, PromptCategory } from "../types";
import { useLocalStorageState } from "../../../global/hooks/useLocalStorageState";

type CategoryFilter = PromptCategory | "All";

type PromptDraft = {
  title: string;
  category: PromptCategory;
  template: string;
};

type PromptsContextValue = {
  prompts: Prompt[];
  filteredPrompts: Prompt[];

  search: string;
  categoryFilter: CategoryFilter;
  setSearch: (v: string) => void;
  setCategoryFilter: (v: CategoryFilter) => void;

  selectedPromptId: string | null;
  selectedPrompt: Prompt | null;
  selectPrompt: (id: string) => void;

  isLoading: boolean;
  createPrompt: (draft: PromptDraft) => Promise<void>;
  updatePrompt: (id: string, draft: PromptDraft) => Promise<void>;
  deletePrompt: (id: string) => Promise<void>;

  exportPrompts: () => void;
  importPrompts: (file: File) => Promise<void>;
};

const PromptsContext = createContext<PromptsContextValue | null>(null);

const STORAGE_KEY = "ai-prompt-manager.prompts.v1";

const SEED: Prompt[] = [
  {
    id: "1",
    title: "Blog post generator",
    category: "Writing",
    template: "Write a blog post about {topic} in a {tone} style",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "2",
    title: "Code review helper",
    category: "Coding",
    template: "Review this code and suggest improvements: {code}",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function PromptsProvider({ children }: { children: React.ReactNode }) {
  // ✅ Persist prompts in localStorage
  const [prompts, setPrompts] = useLocalStorageState<Prompt[]>(
    STORAGE_KEY,
    SEED,
  );

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(
    prompts[0]?.id ?? null,
  );

  const selectedPrompt = useMemo(() => {
    if (!selectedPromptId) return null;
    return prompts.find((p) => p.id === selectedPromptId) ?? null;
  }, [prompts, selectedPromptId]);

  const filteredPrompts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return prompts.filter((p) => {
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.template.toLowerCase().includes(q);

      const matchesCategory =
        categoryFilter === "All" || p.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [prompts, search, categoryFilter]);

  async function createPrompt(draft: PromptDraft) {
    setIsLoading(true);
    await sleep(300);

    const now = Date.now();
    const newPrompt: Prompt = {
      id: generateId(),
      title: draft.title.trim(),
      category: draft.category,
      template: draft.template,
      createdAt: now,
      updatedAt: now,
    };

    setPrompts((prev) => [newPrompt, ...prev]);
    setSelectedPromptId(newPrompt.id);
    setIsLoading(false);
  }

  async function updatePrompt(id: string, draft: PromptDraft) {
    setIsLoading(true);
    await sleep(300);

    const now = Date.now();
    setPrompts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              title: draft.title.trim(),
              category: draft.category,
              template: draft.template,
              updatedAt: now,
            }
          : p,
      ),
    );

    setIsLoading(false);
  }

  async function deletePrompt(id: string) {
    setIsLoading(true);
    await sleep(300);

    setPrompts((prev) => prev.filter((p) => p.id !== id));

    // if deleted prompt was selected, pick first available
    setSelectedPromptId((current) => {
      if (current !== id) return current;
      const remaining = prompts.filter((p) => p.id !== id);
      return remaining[0]?.id ?? null;
    });

    setIsLoading(false);
  }

  function exportPrompts() {
    const data = JSON.stringify(prompts, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-prompts.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  async function importPrompts(file: File) {
    setIsLoading(true);

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      if (!Array.isArray(parsed)) throw new Error("Invalid format");

      // light validation + normalize
      const imported: Prompt[] = parsed
        .filter((p) => p && typeof p === "object")
        .map((p) => ({
          id: typeof p.id === "string" ? p.id : generateId(),
          title: String(p.title ?? "").trim(),
          category: (p.category ?? "Other") as PromptCategory,
          template: String(p.template ?? ""),
          createdAt: typeof p.createdAt === "number" ? p.createdAt : Date.now(),
          updatedAt: typeof p.updatedAt === "number" ? p.updatedAt : Date.now(),
        }))
        .filter((p) => p.title && p.template);

      if (imported.length === 0) throw new Error("No valid prompts");

      // Replace existing prompts with imported prompts (simple + clear)
      setPrompts(imported);
      setSelectedPromptId(imported[0]?.id ?? null);
    } catch {
      alert("Invalid JSON file");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PromptsContext.Provider
      value={{
        prompts,
        filteredPrompts,
        search,
        categoryFilter,
        setSearch,
        setCategoryFilter,
        selectedPromptId,
        selectedPrompt,
        selectPrompt: setSelectedPromptId,
        isLoading,
        createPrompt,
        updatePrompt,
        deletePrompt,
        exportPrompts,
        importPrompts,
      }}
    >
      {children}
    </PromptsContext.Provider>
  );
}

export function usePrompts() {
  const ctx = useContext(PromptsContext);
  if (!ctx) throw new Error("usePrompts must be used within PromptsProvider");
  return ctx;
}
