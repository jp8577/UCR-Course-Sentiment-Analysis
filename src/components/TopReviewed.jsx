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
      <h3>The Top 10 Most Reviewed Courses</h3>
      {topCourses.length === 0 ? (
        <p>Loading top reviewed courses...</p>
      ) : (
        topCourses.map(([course, data]) => (
          <div key={course} className="course-card">
            <strong>{course}</strong>
            <div className="text-sm text-gray-500">
              {data.reviews.length} reviews • Avg Difficulty: {data.averageDifficulty}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
