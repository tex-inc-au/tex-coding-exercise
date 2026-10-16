import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

export type StudentRecord = {
  id: string;
  fullName: string;
  schoolName: string;
  gradeLevel: number;
  homeroom: string;
};

const STUDENTS: StudentRecord[] = [
  { id: "1", fullName: "Aisha Okonkwo", schoolName: "Riverside High", gradeLevel: 10, homeroom: "B-204" },
  { id: "2", fullName: "Ben Carter", schoolName: "Riverside High", gradeLevel: 10, homeroom: "B-204" },
  { id: "3", fullName: "Chen Wei", schoolName: "North Valley Academy", gradeLevel: 11, homeroom: "C-110" },
  { id: "4", fullName: "Diego Morales", schoolName: "Riverside High", gradeLevel: 10, homeroom: "B-205" },
  { id: "5", fullName: "Elena Vasquez", schoolName: "Eastside Prep", gradeLevel: 12, homeroom: "A-301" },
  { id: "6", fullName: "Fatima Hassan", schoolName: "North Valley Academy", gradeLevel: 9, homeroom: "D-102" },
  { id: "7", fullName: "Grace Kim", schoolName: "Riverside High", gradeLevel: 11, homeroom: "B-210" },
  { id: "8", fullName: "Hugo Silva", schoolName: "Eastside Prep", gradeLevel: 10, homeroom: "A-215" },
  { id: "9", fullName: "Isabelle Nguyen", schoolName: "Riverside High", gradeLevel: 12, homeroom: "B-220" },
  { id: "10", fullName: "Jamal Wright", schoolName: "North Valley Academy", gradeLevel: 10, homeroom: "C-115" },
  { id: "11", fullName: "Keiko Tanaka", schoolName: "Eastside Prep", gradeLevel: 11, homeroom: "A-320" },
  { id: "12", fullName: "Liam O'Brien", schoolName: "Riverside High", gradeLevel: 9, homeroom: "B-201" },
  { id: "13", fullName: "Maya Patel", schoolName: "North Valley Academy", gradeLevel: 12, homeroom: "C-120" },
  { id: "14", fullName: "Noah Fischer", schoolName: "Eastside Prep", gradeLevel: 10, homeroom: "A-305" },
  { id: "15", fullName: "Olivia Brooks", schoolName: "Riverside High", gradeLevel: 11, homeroom: "B-212" },
  { id: "16", fullName: "Priya Sharma", schoolName: "North Valley Academy", gradeLevel: 9, homeroom: "D-108" },
  { id: "17", fullName: "Quinn Anderson", schoolName: "Eastside Prep", gradeLevel: 12, homeroom: "A-330" },
  { id: "18", fullName: "Rosa Delgado", schoolName: "Riverside High", gradeLevel: 10, homeroom: "B-206" },
  { id: "19", fullName: "Samuel Lee", schoolName: "North Valley Academy", gradeLevel: 11, homeroom: "C-112" },
  { id: "20", fullName: "Tessa Morgan", schoolName: "Eastside Prep", gradeLevel: 9, homeroom: "A-210" },
  { id: "21", fullName: "Uma Krishnan", schoolName: "Riverside High", gradeLevel: 12, homeroom: "B-225" },
  { id: "22", fullName: "Victor Popov", schoolName: "North Valley Academy", gradeLevel: 10, homeroom: "D-104" },
  { id: "23", fullName: "Wren Sullivan", schoolName: "Eastside Prep", gradeLevel: 11, homeroom: "A-318" },
  { id: "24", fullName: "Xavier Jones", schoolName: "Riverside High", gradeLevel: 9, homeroom: "B-202" },
];

const PORT = 3456;
let requestCount = 0;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseQuery(url: string): URLSearchParams {
  const q = url.includes("?") ? url.split("?")[1] : "";
  return new URLSearchParams(q);
}

async function handleStudents(req: IncomingMessage, res: ServerResponse) {
  requestCount += 1;
  const latency = 300 + Math.random() * 700;
  await delay(latency);

  // ~12% failure rate after first page load
  if (requestCount > 2 && Math.random() < 0.12) {
    res.writeHead(503, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Upstream roster service unavailable" }));
    return;
  }

  const url = req.url ?? "";
  const params = parseQuery(url);
  const q = (params.get("q") ?? "").trim().toLowerCase();
  const page = Math.max(1, Number(params.get("page") ?? "1") || 1);
  const pageSize = Math.min(50, Math.max(1, Number(params.get("pageSize") ?? "10") || 10));
  const sort = params.get("sort") ?? "name";

  let filtered = STUDENTS.filter((s) => {
    if (!q) return true;
    return (
      s.fullName.toLowerCase().includes(q) ||
      s.schoolName.toLowerCase().includes(q) ||
      s.homeroom.toLowerCase().includes(q)
    );
  });

  if (sort === "grade") {
    filtered = [...filtered].sort((a, b) => a.gradeLevel - b.gradeLevel);
  } else if (sort === "school") {
    filtered = [...filtered].sort((a, b) => a.schoolName.localeCompare(b.schoolName));
  } else {
    filtered = [...filtered].sort((a, b) => a.fullName.localeCompare(b.fullName));
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  res.writeHead(200, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  });
  res.end(
    JSON.stringify({
      items,
      page,
      pageSize,
      total,
      latencyMs: Math.round(latency),
    })
  );
}

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url?.startsWith("/api/students")) {
    void handleStudents(req, res);
    return;
  }
  if (req.method === "GET" && req.url === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  res.writeHead(404);
  res.end();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[mock-api] listening on http://127.0.0.1:${PORT}`);
});
