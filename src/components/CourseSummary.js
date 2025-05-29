"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function CourseSummary({ courseId }) {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    Papa.parse("/course_summary.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const row = results.data.find((r) => r.CourseName === courseId);
        setSummary(row ? row.SentimentLabel : "No summary available.");
      },
      error: (error) => {
        console.error("Error loading course summary CSV:", error);
      },
    });
  }, [courseId]);

  return (
    <div className="mt-4 rounded-lg bg-gray-50 p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold text-gray-700">
        Course Summary:
      </h3>
      <p className="leading-relaxed text-gray-800">{summary}</p>
    </div>
  );
}
