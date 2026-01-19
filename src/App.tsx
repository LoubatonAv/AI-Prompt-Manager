import AppShell from "./app/layout/AppShell";
import { PromptsProvider } from "./features/prompts/context/PromptsContext";
import Dashboard from "./features/prompts/components/Dashboard";

export default function App() {
  return (
    <PromptsProvider>
      <AppShell>
        <Dashboard />
      </AppShell>
    </PromptsProvider>
  );
}
