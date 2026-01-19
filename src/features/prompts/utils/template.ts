// Extract unique variable names inside { } brackets.
// Handles: spacing "{ topic }", duplicates, and ignores empty "{}".
export function extractVariables(template: string): string[] {
  const regex = /\{([^{}]*)\}/g;
  const seen = new Set<string>();
  const vars: string[] = [];

  let match: RegExpExecArray | null;

  while ((match = regex.exec(template)) !== null) {
    const raw = match[1] ?? "";
    const name = raw.trim();

    // ignore empty like "{}" or "{   }"
    if (!name) continue;

    // de-dupe while preserving order
    if (!seen.has(name)) {
      seen.add(name);
      vars.push(name);
    }
  }

  return vars;
}

// Replace {var} in template using provided values.
// If a value is empty/missing, keep the placeholder (better UX).
export function buildFinalPrompt(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{([^{}]*)\}/g, (fullMatch, inner) => {
    const key = String(inner ?? "").trim();
    if (!key) return fullMatch;

    const value = values[key];
    if (!value || value.trim() === "") return `{${key}}`; // keep placeholder
    return value;
  });
}

// Utility: when variables change, keep existing values if possible,
// and create empty ones for new variables.
export function syncVariableValues(
  variables: string[],
  prevValues: Record<string, string>,
): Record<string, string> {
  const next: Record<string, string> = {};

  for (const v of variables) {
    next[v] = prevValues[v] ?? "";
  }

  return next;
}
