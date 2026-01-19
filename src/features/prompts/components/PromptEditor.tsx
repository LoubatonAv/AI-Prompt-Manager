import { useEffect, useMemo, useState } from "react";
import { usePrompts } from "../context/PromptsContext";
import {
  extractVariables,
  buildFinalPrompt,
  syncVariableValues,
} from "../utils/template";

export default function PromptEditor() {
  const { selectedPrompt } = usePrompts();
  const [values, setValues] = useState<Record<string, string>>({});

  const variables = useMemo(() => {
    if (!selectedPrompt) return [];
    return extractVariables(selectedPrompt.template);
  }, [selectedPrompt]);

  useEffect(() => {
    setValues((prev) => syncVariableValues(variables, prev));
  }, [variables]);

  const finalPrompt = useMemo(() => {
    if (!selectedPrompt) return "";
    return buildFinalPrompt(selectedPrompt.template, values);
  }, [selectedPrompt, values]);

  if (!selectedPrompt) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        Select a prompt to preview it
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="font-semibold">Variables</h3>
        {variables.map((v) => (
          <input
            key={v}
            value={values[v] ?? ""}
            onChange={(e) => setValues((p) => ({ ...p, [v]: e.target.value }))}
            placeholder={v}
            className="mt-2 w-full rounded border border-slate-800 bg-slate-950 px-3 py-2"
          />
        ))}
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="font-semibold">Final Prompt Preview</h3>
        <pre className="mt-2 whitespace-pre-wrap text-sm">{finalPrompt}</pre>
      </div>
    </div>
  );
}
