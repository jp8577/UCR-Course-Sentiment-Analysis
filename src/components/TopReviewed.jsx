
import Link from "next/link";

export async function generateStaticParams() {
  const res = await fetch("http://localhost:8000/api/courses");
  const courses = await res.json();

  return courses.map((course) => ({
    courseId: course.course_id,
  }));
}

async function getCourses() {
  const res = await fetch("http://localhost:8000/api/courses");
  return await res.json();
}

export default async function TopReviewed() {
  const courses = await getCourses();

  // Sort by number of reviews, descending
  const sortedCourses = courses.sort(
    (a, b) => b.reviews.length - a.reviews.length,
  );

  // Take top 10
  const topCourses = sortedCourses.slice(0, 10);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {topCourses.map((course) => (
        <Link key={course.course_id} href={`/courses/${course.course_id}`}>
          <div className="cursor-pointer rounded-lg border p-4 shadow transition hover:shadow-md">
            <h3 className="mb-2 text-xl font-semibold">{course.course_id}</h3>
            <p className="mb-1 text-sm">
              Avg Difficulty: {course.avg_difficulty}
            </p>
            <p className="text-sm text-gray-600">
              {course.reviews.length} reviews
            </p>
          </div>
        </Link>
      ))}
=======
"use client";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";

// Function to group reviews by course and calculate average difficulty
function groupReviews(rows) {
  const group = {};
  let currentClass = null;

  for (const row of rows) {
    if (!row.Date || !row.Difficulty) continue; // Skip if no required fields

    if (row.Class) {
      currentClass = row.Class;

      if (!group[currentClass]) {
        group[currentClass] = {
          reviews: [],
          averageDifficulty: row["Average Difficulty"],
        };
      }
    }

    if (currentClass) {
      group[currentClass].reviews.push(row);
    }
  }

  return group;
}

// Function to get the top 10 courses based on number of reviews
function getTopReviewedCourses(grouped, count = 10) {
  return Object.entries(grouped)
    .sort(([, a], [, b]) => b.reviews.length - a.reviews.length)
    .slice(0, count);
}

// Default export of the TopReviewed component
export default function TopReviewed() {
  const [topCourses, setTopCourses] = useState([]);

  useEffect(() => {
    Papa.parse("/data/UCR_course_database.csv", {
      header: true, // Treat first row as column names
      download: true, // Fetch the CSV file from the public folder
      complete: (results) => {
        const grouped = groupReviews(results.data); // Group reviews by course
        const top = getTopReviewedCourses(grouped); // Get top reviewed courses
        setTopCourses(top); // Set state with top 10 courses
      },
    });
  }, []);

  return (
    <div className="course-list">
      {topCourses.length === 0 ? (
        <p>Loading top reviewed courses...</p>
      ) : (
        topCourses.map(([course, data]) => (
          <div key={course} className="course-card">
            <strong>{course}</strong>
            <div className="text-sm text-gray-500">
              {data.reviews.length} reviews • Avg Difficulty:{" "}
              {data.averageDifficulty}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
