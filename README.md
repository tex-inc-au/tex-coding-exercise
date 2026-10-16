# TEX coding exercise

Welcome! Your interviewer will tell you which exercise to open during the session.
Please share your full screen and keep your camera on, and talk through your thinking as you go.

## Get the code

```bash
git clone https://github.com/tex-inc-au/tex-coding-exercise
cd tex-coding-exercise
```

All commands below start from this repo root.

## C++ exercises

Requires a C++17 compiler (g++ or clang++). CMake is optional.

| Exercise | Folder | Build & run (after `cd` into the folder) |
|----------|--------|--------------------------------|
| Code review | `cpp/code-review/` | `g++ -std=c++17 -Wall -g src/*.cpp -o roster_demo && ./roster_demo` |
| Live build | `cpp/live-build/` | `g++ -std=c++17 -Wall -Wextra -g src/*.cpp -o student_lookup && ./student_lookup data/students.csv rank` |

## TypeScript / React exercises

Requires Node 20 (see `.nvmrc`; run `nvm use` from the repo root).

| Exercise | Folder | Run (after `cd` into the folder) | Open |
|----------|--------|-----|------|
| Code review | `typescript/code-review/` | `npm install && npm run dev` | http://127.0.0.1:4321 |
| Live build | `typescript/live-build/` | `npm install && npm run dev` | http://127.0.0.1:4322 |

Read each exercise's `CANDIDATE_BRIEF.md` before you start.
