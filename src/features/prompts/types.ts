export type PromptCategory = "Coding" | "Writing" | "Marketing" | "Other";

export type Prompt = {
  id: string;
  title: string;
  category: PromptCategory;
  template: string;
  createdAt: number;
};
