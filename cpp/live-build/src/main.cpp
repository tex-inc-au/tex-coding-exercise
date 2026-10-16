#include <fstream>
#include <iostream>
#include <sstream>
#include <string>

#include "student.h"

// Usage: ./student_lookup <csv-path> [command] [args...]
//   search <query>   print students whose name matches
//   rank             print students ranked by score
int main(int argc, char** argv) {
    if (argc < 3) {
        std::cerr << "usage: " << argv[0] << " <csv-path> search <query> | rank\n";
        return 2;
    }

    std::ifstream in(argv[1]);
    if (!in) {
        std::cerr << "cannot open " << argv[1] << "\n";
        return 1;
    }
    std::stringstream buf;
    buf << in.rdbuf();
    auto students = parseStudents(buf.str());

    std::string cmd = argv[2];
    if (cmd == "search" && argc >= 4) {
        for (const auto& s : searchByName(students, argv[3])) std::cout << s.id << '\t' << s.name << '\n';
    } else if (cmd == "rank") {
        for (const auto& s : rankByScore(students)) std::cout << s.score << '\t' << s.name << '\n';
    } else {
        std::cerr << "unknown command\n";
        return 2;
    }
    return 0;
}
