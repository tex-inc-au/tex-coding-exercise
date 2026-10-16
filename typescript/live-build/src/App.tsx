import { StudentLookup } from "./components/StudentLookup";

export function App() {
  return (
    <div className="app">
      <h1>TEX Schools — Student lookup</h1>
      <p className="subtitle">
        Build a searchable list for district staff. The mock API runs locally when
        you start this exercise.
      </p>
      <div className="panel">
        <StudentLookup />
      </div>
    </div>
  );
}
