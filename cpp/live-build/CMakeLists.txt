cmake_minimum_required(VERSION 3.16)
project(tex_student_lookup CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(student_lookup src/main.cpp src/student.cpp)
target_compile_options(student_lookup PRIVATE -Wall -Wextra)
