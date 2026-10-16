import { useEffect, useState } from "react";
import { fetchStudents, type StudentRecord } from "../api/students";

/**
 * Starter implementation — extend during the live build.
 * Initial goal: load and show students; add search/filter as discussed with interviewer.
 */
export function StudentLookup() {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchStudents({ q: query })
      .then((data) => {
        if (!cancelled) {
          setStudents(data.items);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStudents([]);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <section aria-label="Student lookup">
      <div className="controls">
        <label>
          Search students
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, school, or homeroom"
          />
        </label>
      </div>

      {loading && <p className="status">Loading…</p>}

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>School</th>
            <th>Grade</th>
            <th>Homeroom</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.fullName}</td>
              <td>{s.schoolName}</td>
              <td>{s.gradeLevel}</td>
              <td>{s.homeroom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
