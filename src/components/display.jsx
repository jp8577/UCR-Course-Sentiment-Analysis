"use client";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";

function groupReviews(rows) {
  // helper function to group reviews by their class and to store average difficulty
  const group = {};
  let currentClass = null;

  for (const row of rows) {
    if (!row.Date || !row.Difficulty) continue; // if no required date or difficulty, skip

    if (row.Class) {
      // if class column exists, make it the current class and create a group for it
      currentClass = row.Class;

      if (!group[currentClass]) {
        // if group doesn't exist yet, make one
        group[currentClass] = {
          // each group will hold an empty array to hold the reviews and the average difficulty
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

export default function CourseReviews() {
  const [groupedReviews, setGroupedReviews] = useState({});

  useEffect(() => {
    Papa.parse("/data/UCR_course_database.csv", {
      header: true, // treat first row as column names
      download: true, // fetch csv from public folder
      complete: (results) => {
        const grouped = groupReviews(results.data); // group this data using helper function
        setGroupedReviews(grouped);
      },
    });
  }, []); // empty array means effect only runs once

  return (
    <div className="">
      {Object.entries(groupedReviews).map(
        (
          [course, data], // loop over each course (data has reviews array and average difficulty)
        ) => (
          <div key={course} className="mb-3 rounded-xl bg-white p-6 shadow">
            <div className="px-10 py-3">
              <h2 className="mb-2 text-xl font-bold text-pink-400">{course}</h2>
              <p className="mb-4 text-pink-300">
                <strong>Average Difficulty:</strong> {data.averageDifficulty}
              </p>
              <ul className="space-y-4">
                {data.reviews.map(
                  (
                    review,
                    index, // loop through each review for the course
                  ) => (
                    <li key={index} className="border-b pb-2">
                      <p>
                        <strong>Difficulty:</strong> {review.Difficulty}
                      </p>
                      <p>
                        <strong>Comments:</strong>{" "}
                        {review["Additional Comments"]}
                      </p>
                      <p>
                        <strong>Date:</strong> {review.Date}
                      </p>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
