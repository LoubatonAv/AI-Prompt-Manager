import AppShell from "./app/layout/AppShell";
import {
  PromptsProvider,
  usePrompts,
} from "./features/prompts/context/PromptsContext";

function PromptsDebugList() {
  const { prompts } = usePrompts();

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-200">
        Saved Prompts
      </h2>
      <ul className="space-y-2">
        {prompts.map((p) => (
          <li key={p.id} className="text-slate-300">
            <span className="font-medium">{p.title}</span>{" "}
            <span className="text-slate-500">({p.category})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <PromptsProvider>
      <AppShell>
        <PromptsDebugList />
      </AppShell>
    </PromptsProvider>
  );
}

export default App;
