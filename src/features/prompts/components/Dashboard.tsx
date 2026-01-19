import PromptList from "./PromptList";
import SearchFilterBar from "./SearchFilterBar";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Prompt Dashboard</h2>
        <p className="text-sm text-slate-400">
          Browse and manage your saved prompts.
        </p>
      </div>

      <SearchFilterBar />
      <PromptList />
    </div>
  );
}
