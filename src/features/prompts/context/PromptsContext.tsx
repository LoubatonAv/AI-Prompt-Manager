import React, { createContext, useContext, useMemo, useState } from "react";
import type { Prompt, PromptCategory } from "../types";

type CategoryFilter = PromptCategory | "All";

type PromptsContextValue = {
  prompts: Prompt[];
  filteredPrompts: Prompt[];
  search: string;
  categoryFilter: CategoryFilter;
  setSearch: (value: string) => void;
  setCategoryFilter: (value: CategoryFilter) => void;
  addPrompt: (prompt: Prompt) => void;
};

const PromptsContext = createContext<PromptsContextValue | null>(null);

export function PromptsProvider({ children }: { children: React.ReactNode }) {
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: "1",
      title: "Blog post generator",
      category: "Writing",
      template: "Write a blog post about {topic} in a {tone} style",
      createdAt: Date.now(),
    },
    {
      id: "2",
      title: "Code review helper",
      category: "Coding",
      template: "Review this code and suggest improvements: {code}",
      createdAt: Date.now(),
    },
  ]);

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

  function addPrompt(prompt: Prompt) {
    setPrompts((prev) => [...prev, prompt]);
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
        addPrompt,
      }}
    >
      {children}
    </PromptsContext.Provider>
  );
}

export function usePrompts() {
  const context = useContext(PromptsContext);
  if (!context)
    throw new Error("usePrompts must be used within PromptsProvider");
  return context;
}
