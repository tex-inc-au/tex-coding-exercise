# C++ live build exercise (≈30 minutes)

Build a small command-line **student lookup** for TEX Schools in C++17. Requirements may change during the session; that is intentional.

## Starting point

- `src/student.h`: the API you will implement.
- `src/student.cpp`: stubs that return empty results.
- `src/main.cpp`: a CLI that reads a CSV file and calls your functions.
- `data/students.csv`: sample data.

Build and run. From the root of the `tex-coding-exercise` repo:

```bash
cd cpp/live-build
g++ -std=c++17 -Wall -Wextra -g src/*.cpp -o student_lookup
./student_lookup data/students.csv search an
./student_lookup data/students.csv rank
```

(or `cmake -S . -B build && cmake --build build`)

## Base requirements

1. `parseStudents`: parse the CSV (skip the header row) into `Student` values.
2. `searchByName`: case-insensitive substring match on the student name.
3. `rankByScore`: return students sorted by score, highest first.

## Ground rules

- Standard library only. Use any reference docs you'd normally use (cppreference is fine); **no AI assistants**.
- Think aloud. Explain your choices as you make them.
- Small, working steps beat a big untested rewrite. Compile often.
