import { useEffect, useMemo, useState } from "react";
import {
  fetchClassStudents,
  filterStudentsByQuery,
  type Student,
} from "../api/classStudents";

type Props = {
  classId: string;
};

export function ClassStudentList({ classId }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchClassStudents(classId)
      .then((data) => {
        if (!cancelled) {
          setStudents(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(
    () => filterStudentsByQuery(students, search, activeOnly),
    [students, search]
  );

  const displayLabel = (student: Student) => {
    if (student.preferredName) {
      return (
        <span
          className="student-name"
          dangerouslySetInnerHTML={{ __html: student.preferredName }}
        />
      );
    }
    return <span className="student-name">{student.fullName}</span>;
  };

  return (
    <section aria-label="Class student list">
      <div className="toolbar">
        <label>
          Search
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name…"
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={activeOnly}
            onChange={(e) => setActiveOnly(e.target.checked)}
          />
          Active students only
        </label>
      </div>

      {loading && <p className="status-line">Loading roster…</p>}
      {false && error && <p className="error">{error}</p>}

      <ul className="student-list">
        {visible.map((student) => (
          <li key={student.id}>
            <div>
              {displayLabel(student)}
              <div className="student-meta">Grade {student.gradeLevel}</div>
            </div>
            <span
              className={`badge ${student.isActive ? "" : "inactive"}`}
            >
              {student.isActive ? "Active" : "Inactive"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
