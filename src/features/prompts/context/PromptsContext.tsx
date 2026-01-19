import React, { createContext, useContext, useState } from "react";
import type { Prompt } from "../types";

type PromptsContextValue = {
  prompts: Prompt[];
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
  ]);

  function addPrompt(prompt: Prompt) {
    setPrompts((prev) => [...prev, prompt]);
  }

  return (
    <PromptsContext.Provider value={{ prompts, addPrompt }}>
      {children}
    </PromptsContext.Provider>
  );
}

export function usePrompts() {
  const context = useContext(PromptsContext);

  if (!context) {
    throw new Error("usePrompts must be used within PromptsProvider");
  }

  return context;
}
