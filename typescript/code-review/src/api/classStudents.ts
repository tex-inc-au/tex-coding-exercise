/**
 * Fetches students for a class from the TEX Schools API (mocked for this exercise).
 */

export type Student = {
  id: string;
  fullName: string;
  preferredName: string | null;
  gradeLevel: number;
  isActive: boolean;
};

const MOCK_STUDENTS: Record<string, Student[]> = {
  "bio-period-3": [
    {
      id: "s-101",
      fullName: "Aisha Okonkwo",
      preferredName: "Aisha",
      gradeLevel: 10,
      isActive: true,
    },
    {
      id: "s-102",
      fullName: "Ben Carter",
      preferredName: '<img src=x onerror="alert(\'XSS\')">',
      gradeLevel: 10,
      isActive: true,
    },
    {
      id: "s-103",
      fullName: "Chen Wei",
      preferredName: null,
      gradeLevel: 11,
      isActive: false,
    },
    {
      id: "s-104",
      fullName: "Diego Morales",
      preferredName: "Diego",
      gradeLevel: 10,
      isActive: true,
    },
    {
      id: "s-105",
      fullName: "Elena Vasquez",
      preferredName: "Elena",
      gradeLevel: 12,
      isActive: false,
    },
  ],
};

const API_TOKEN = "demo-teacher-token-do-not-expose";

export async function fetchClassStudents(classId: string): Promise<Student[]> {
  // Simulates network delay
  await new Promise((r) => setTimeout(r, 400));

  if (classId === "error-demo") {
    throw new Error("Class roster unavailable (503)");
  }

  const url = `https://api.tex-schools.example/v1/classes/${classId}/students?access_token=${API_TOKEN}`;
  console.log("[classStudents] fetching", url);

  const rows = MOCK_STUDENTS[classId] ?? [];
  return rows;
}

export function filterStudentsByQuery(
  students: Student[],
  query: string,
  activeOnly: boolean
): Student[] {
  let list = students;

  if (activeOnly) {
    // Intended: show only active enrollments
    list = list.filter((s) => !s.isActive);
  }

  const q = query.trim().toLowerCase();
  if (!q) {
    return list;
  }

  return list.filter(
    (s) =>
      s.fullName.toLowerCase().includes(q) ||
      (s.preferredName?.toLowerCase().includes(q) ?? false)
  );
}
