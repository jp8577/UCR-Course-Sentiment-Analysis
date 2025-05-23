"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDifficultyEmoji } from "@/utils/difficultyEmoji";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8000/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;

    // Normalize input and course IDs to uppercase for comparison
    const normalizedSearch = searchTerm.trim().toUpperCase();

    const foundCourse = courses.find(
      (course) => course.course_id.toUpperCase() === normalizedSearch,
    );

    if (foundCourse) {
      router.push(`/courses/${foundCourse.course_id}`);
    } else {
      // Optional: alert('Course not found!');
      console.log("Course not found.");
    }
  };

  return (
    <div className="p-6">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold">UCR Course Reviews</h1>
        <p className="mb-6 text-lg text-gray-600">
          Real reviews by UCR students. Find the best classes before you enroll.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search by course code or name..."
            className="w-72 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="rounded bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </header>

      <Link href="/">
        <button className="mb-8 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
          Return to Home
        </button>
      </Link>

      {courses.length === 0 ? (
        <p>Loading courses...</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.course_id}
              href={`/courses/${course.course_id}`}
              passHref
            >
              <div className="cursor-pointer rounded-lg border bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800">
                  {course.course_id}
                </h2>
                <p className="text-gray-600">
                  Avg Difficulty: {course.avg_difficulty}{" "}
                  {getDifficultyEmoji(Number(course.avg_difficulty))}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
