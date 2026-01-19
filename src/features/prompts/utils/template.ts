export function extractVariables(template: string): string[] {
  const regex = /\{([^{}]*)\}/g;
  const seen = new Set<string>();
  const vars: string[] = [];

  let match: RegExpExecArray | null;

  while ((match = regex.exec(template)) !== null) {
    const raw = match[1] ?? "";
    const name = raw.trim();

    if (!name) continue;
    if (!seen.has(name)) {
      seen.add(name);
      vars.push(name);
    }
  }

  return vars;
}

export function hasEmptyVariables(template: string): boolean {
  return /\{\s*\}/.test(template);
}

export function buildFinalPrompt(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{([^{}]*)\}/g, (full, inner) => {
    const key = String(inner ?? "").trim();
    if (!key) return full;

    const value = values[key];
    if (!value || value.trim() === "") return `{${key}}`;

    return value;
  });
}

export function syncVariableValues(
  variables: string[],
  prevValues: Record<string, string>,
) {
  const next: Record<string, string> = {};
  for (const v of variables) {
    next[v] = prevValues[v] ?? "";
  }
  return next;
}
