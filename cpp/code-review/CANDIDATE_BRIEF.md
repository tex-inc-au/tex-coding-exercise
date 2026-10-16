# C++ code review exercise (≈15 minutes)

A teammate wrote a small C++17 module for **TEX Schools** that summarises a class roster: average and highest score, top-N students, a pass-mark count, removing inactive students, a per-term grade book, and a CSV report.

## Your task

1. Build and run it (from this folder):

   ```bash
   g++ -std=c++17 -Wall -g src/*.cpp -o roster_demo && ./roster_demo
   ```

   (or `cmake -S . -B build && cmake --build build && ./build/roster_demo`)
2. Read `src/roster.h`, `src/roster.cpp`, `src/main.cpp`. Compare the output with what you would expect from the data in `main.cpp`.
3. Talk through what you notice: correctness bugs, undefined behaviour, memory/ownership issues, API design, and what you would change before merge.
4. You do **not** need to fix everything. Prioritise what matters most for teachers and student data.

## Context

- C++17, standard library only. No external dependencies.
- Think aloud: we care as much about *how* you reason as what you find.

## Hints we will not give

There is no checklist. Treat this like a real PR review on production-bound code.
