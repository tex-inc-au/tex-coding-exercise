# Live build exercise (≈30 minutes)

District staff need to **find students** across schools in TEX. You will extend the starter UI while sharing your screen.

## Starting point

- Run `npm run build-exercise` from the repo root (starts the mock API and the Vite app).
- Open the URL shown in the terminal (default `http://127.0.0.1:4322`).
- Code lives in `src/components/StudentLookup.tsx` and `src/api/students.ts`.

## Initial requirements (first ~10 minutes)

1. Show students from the local mock API (`GET /api/students`).
2. **Search** by name, school, or homeroom (server supports `q` query param — already wired in the starter).
3. Handle **loading** so the UI does not flash empty rows while data is in flight.
4. Talk through trade-offs as you go; your interviewer will add requirements during the session.

## What we are looking for

- Sensible React + TypeScript structure as complexity grows.
- You react to **new requirements** in real time (do not pre-build features we have not asked for).
- Clear communication: plan briefly, then implement, then sanity-check in the browser.

## API (local only)

- `GET /api/students?q=&page=&pageSize=&sort=name|grade|school`
- Responses include `{ items, page, pageSize, total }`.
- The mock server is intentionally slow and sometimes returns errors — behavior may change when your interviewer asks.

No API keys or external services are required.
