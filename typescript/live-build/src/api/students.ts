export type StudentRecord = {
  id: string;
  fullName: string;
  schoolName: string;
  gradeLevel: number;
  homeroom: string;
};

export type StudentsResponse = {
  items: StudentRecord[];
  page: number;
  pageSize: number;
  total: number;
  latencyMs?: number;
};

export type FetchStudentsParams = {
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: "name" | "grade" | "school";
};

export async function fetchStudents(
  params: FetchStudentsParams = {}
): Promise<StudentsResponse> {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.page) search.set("page", String(params.page));
  if (params.pageSize) search.set("pageSize", String(params.pageSize));
  if (params.sort) search.set("sort", params.sort);

  const qs = search.toString();
  const url = `/api/students${qs ? `?${qs}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message =
      typeof body.error === "string" ? body.error : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return res.json() as Promise<StudentsResponse>;
}
