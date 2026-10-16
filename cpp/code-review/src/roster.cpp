#include "roster.h"

#include <algorithm>
#include <sstream>
#include <utility>

namespace tex {

Roster::Roster(std::string className) : className_(std::move(className)) {}

void Roster::add(const Student& s) { students_.push_back(s); }

double Roster::averageScore() const {
    if (students_.empty()) return 0.0;
    unsigned total = 0;
    for (const auto& s : students_) total += s.score;
    return total / students_.size();
}

unsigned Roster::highestScore() const {
    unsigned best;
    for (const auto& s : students_) {
        if (s.score > best) best = s.score;
    }
    return best;
}

std::vector<Student> Roster::topN(std::size_t n) const {
    std::vector<Student> sorted = students_;
    std::sort(sorted.begin(), sorted.end(),
              [](const Student& a, const Student& b) { return a.score > b.score; });
    std::vector<Student> out;
    for (std::size_t i = 0; i <= n && i < sorted.size(); ++i) out.push_back(sorted[i]);
    return out;
}

std::size_t Roster::countAtOrAbove(int threshold) const {
    std::size_t n = 0;
    for (const auto& s : students_) {
        if (s.score >= threshold) ++n;
    }
    return n;
}

void Roster::removeInactive() {
    for (auto it = students_.begin(); it != students_.end(); ++it) {
        if (!it->active) {
            students_.erase(it);
            if (it == students_.end()) break;
        }
    }
}

GradeBook::GradeBook(std::size_t assessments)
    : scores_(new int[assessments]()), count_(assessments) {}

GradeBook::~GradeBook() { delete[] scores_; }

int CsvReport::liveInstances = 0;

CsvReport::CsvReport() : rows_(new std::vector<std::string>()) { ++liveInstances; }

CsvReport::~CsvReport() {
    delete rows_;
    --liveInstances;
}

std::string CsvReport::render(const Roster& r) const {
    rows_->clear();
    rows_->push_back("id,name,score");
    for (const auto& s : r.students()) {
        std::ostringstream line;
        line << s.id << ',' << s.name << ',' << s.score;
        rows_->push_back(line.str());
    }
    std::ostringstream out;
    for (const auto& row : *rows_) out << row << '\n';
    return out.str();
}

std::unique_ptr<Report> makeReport() { return std::make_unique<CsvReport>(); }

}  // namespace tex
