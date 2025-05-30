"use client";

import Papa from "papaparse";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDifficultyEmoji } from "@/utils/difficultyEmoji";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setIsLoading(false);
      });

    // Fetchand parse course_summary.csv
    Papa.parse("/course_summary.csv", {
      download: true,
      he
  }, []);

  // Filter courses by partial case-insensitive match
  const filteredCourses = courses.filter((course) =>
    course.course_id.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

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
            placeholder="Search by Course ID"
            className="w-72 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </header>

      
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-lg bg-gray-200"
            />
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <p className="text-center text-gray-600">No matching courses found.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
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
                {/* Comment Summary Section */}
                <div className="mt-4 rounded bg-gray-50 p-3">
                  <h3 className="mb-1 text-sm font-semibold text-gray-700">
                    Course Summary:
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {summaries[course.course_id] || "No summary available."}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
