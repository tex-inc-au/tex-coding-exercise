#pragma once

#include <string>
#include <vector>

struct Student {
    int id = 0;
    std::string name;
    int year = 0;
    std::string className;
    int score = 0;
    bool active = false;
};

// Parse CSV text in the format of data/students.csv (header row first).
std::vector<Student> parseStudents(const std::string& csvText);

// Case-insensitive substring match on name.
std::vector<Student> searchByName(const std::vector<Student>& all, const std::string& query);

// Highest score first.
std::vector<Student> rankByScore(const std::vector<Student>& all);
