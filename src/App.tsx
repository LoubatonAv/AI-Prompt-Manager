import AppShell from "./app/layout/AppShell";
import { PromptsProvider } from "./features/prompts/context/PromptsContext";
import Dashboard from "./features/prompts/components/Dashboard";

function App() {
  return (
    <PromptsProvider>
      <AppShell>
        <Dashboard />
      </AppShell>
    </PromptsProvider>
  );
}

export default App;
