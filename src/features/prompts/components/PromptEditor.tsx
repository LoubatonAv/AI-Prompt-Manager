import { useEffect, useMemo, useState } from "react";
import { usePrompts } from "../context/PromptsContext";
import {
  buildFinalPrompt,
  extractVariables,
  syncVariableValues,
} from "../utils/template";

export default function PromptEditor() {
  const { selectedPrompt } = usePrompts();
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

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

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(finalPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Failed to copy");
    }
  }

  if (!selectedPrompt) {
    return (
      <div className="surface p-4 text-sm text-slate-600 dark:text-slate-300">
        Select a prompt to preview and fill variables.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="surface p-4">
        <h3 className="text-sm font-semibold">Template</h3>
        <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
          {selectedPrompt.template}
        </p>
      </div>

      <div className="surface p-4">
        <h3 className="text-sm font-semibold">Variables</h3>

        {variables.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            No variables detected.
          </p>
        ) : (
          <div className="mt-3 space-y-3">
            {variables.map((v) => (
              <div key={v}>
                <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                  {v}
                </label>
                <input
                  value={values[v] ?? ""}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [v]: e.target.value }))
                  }
                  placeholder={`Enter ${v}...`}
                  className="input"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="surface p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Final Prompt Preview</h3>

          <button
            onClick={copyToClipboard}
            disabled={!finalPrompt}
            className="btn cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <pre className="whitespace-pre-wrap text-sm text-slate-900 dark:text-slate-100">
          {finalPrompt}
        </pre>
      </div>
    </div>
  );
}
