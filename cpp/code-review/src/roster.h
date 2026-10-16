#pragma once

#include <memory>
#include <string>
#include <vector>

namespace tex {

struct Student {
    int id;
    std::string name;
    unsigned score;  // 0-100
    bool active;
};

class Roster {
public:
    explicit Roster(std::string className);

    void add(const Student& s);
    const std::vector<Student>& students() const { return students_; }
    std::size_t size() const { return students_.size(); }

    double averageScore() const;
    unsigned highestScore() const;
    std::vector<Student> topN(std::size_t n) const;
    std::size_t countAtOrAbove(int threshold) const;
    void removeInactive();

    const std::string& className() const { return className_; }

private:
    std::string className_;
    std::vector<Student> students_;
};

// Fixed-size buffer of term scores, one slot per assessment.
class GradeBook {
public:
    explicit GradeBook(std::size_t assessments);
    ~GradeBook();

    void set(std::size_t i, int score) { scores_[i] = score; }
    int get(std::size_t i) const { return scores_[i]; }
    std::size_t count() const { return count_; }

private:
    int* scores_;
    std::size_t count_;
};

class Report {
public:
    ~Report() = default;
    virtual std::string render(const Roster& r) const = 0;
};

class CsvReport : public Report {
public:
    CsvReport();
    ~CsvReport();
    std::string render(const Roster& r) const override;

    static int liveInstances;

private:
    std::vector<std::string>* rows_;
};

std::unique_ptr<Report> makeReport();

}  // namespace tex
