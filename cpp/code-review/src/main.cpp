#include <iostream>

#include "roster.h"

int main() {
    tex::Roster roster("Year 9 Maths");
    roster.add({1, "Aisha Khan", 91, true});
    roster.add({2, "Ben Carter", 58, false});
    roster.add({3, "Diego Ruiz", 64, false});
    roster.add({4, "Chen Wei", 77, true});
    roster.add({5, "Elena Rossi", 86, true});

    std::cout << "Class: " << roster.className() << "\n";
    std::cout << "Average: " << roster.averageScore() << "\n";
    std::cout << "Highest: " << roster.highestScore() << "\n";
    std::cout << "At or above 70: " << roster.countAtOrAbove(70) << "\n";

    std::cout << "Top 3:\n";
    for (const auto& s : roster.topN(3)) std::cout << "  " << s.name << " (" << s.score << ")\n";

    roster.removeInactive();
    std::cout << "Active students: " << roster.size() << "\n";

    tex::GradeBook term1(4);
    term1.set(0, 88);
    tex::GradeBook draft = term1;
    draft.set(0, 0);
    std::cout << "Term 1 assessment 1: " << term1.get(0) << "\n";

    auto report = tex::makeReport();
    std::cout << report->render(roster);
    return 0;
}
