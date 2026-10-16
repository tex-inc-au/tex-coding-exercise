import { ClassStudentList } from "./components/ClassStudentList";

export function App() {
  return (
    <div className="app">
      <h1>Ms. Rivera — Period 3 Biology</h1>
      <p className="subtitle">
        Class roster as shown in TEX Schools (demo data). Review this screen with
        your interviewer.
      </p>
      <ClassStudentList classId="bio-period-3" />
      <p className="note">
        Demo only — no live backend. Data is mocked in the browser.
      </p>
    </div>
  );
}
