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
  // data
  prompts: Prompt[];
  filteredPrompts: Prompt[];

  // ui state
  isLoading: boolean;
  search: string;
  categoryFilter: CategoryFilter;

  // ui actions
  setSearch: (value: string) => void;
  setCategoryFilter: (value: CategoryFilter) => void;

  // crud
  createPrompt: (draft: PromptDraft) => Promise<void>;
  updatePrompt: (id: string, draft: PromptDraft) => Promise<void>;
  deletePrompt: (id: string) => Promise<void>;
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
  const [prompts, setPrompts] = useLocalStorageState<Prompt[]>(
    STORAGE_KEY,
    SEED,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");

  const filteredPrompts = useMemo(() => {
    const q = search.trim().toLowerCase();

    return prompts.filter((p) => {
      const matchesSearch =
        q.length === 0 ||
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
    setIsLoading(false);
  }

  return (
    <PromptsContext.Provider
      value={{
        prompts,
        filteredPrompts,
        isLoading,
        search,
        categoryFilter,
        setSearch,
        setCategoryFilter,
        createPrompt,
        updatePrompt,
        deletePrompt,
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
