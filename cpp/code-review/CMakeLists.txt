cmake_minimum_required(VERSION 3.16)
project(tex_roster_review CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_library(roster src/roster.cpp)
target_include_directories(roster PUBLIC src)
target_compile_options(roster PRIVATE -Wall)

add_executable(roster_demo src/main.cpp)
target_link_libraries(roster_demo PRIVATE roster)
