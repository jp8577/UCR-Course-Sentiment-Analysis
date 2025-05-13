"use client";

import { useState } from "react";
import Link from "next/link";

export default function ReviewForm() {
  const [courseCode, setCourseCode] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [difficulty, setDifficulty] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      courseCode,
      reviewText,
      difficulty,
    };

    // Submit the review data to the backend
    try {
      const res = await fetch("/api/submitReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        alert("Review submitted successfully!");
        // Reset the form
        setCourseCode("");
        setReviewText("");
        setDifficulty(1);
      } else {
        alert("Failed to submit the review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <Link href="/">
        <button className="mb-8 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
          Return to Home
        </button>
      </Link>
      <h2 className="mb-4 text-2xl font-semibold">Submit Your Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="courseCode"
            className="block font-medium text-gray-700"
          >
            Course Code
          </label>
          <input
            type="text"
            id="courseCode"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., AHS007"
            required
          />
        </div>

        <div>
          <label
            htmlFor="reviewText"
            className="block font-medium text-gray-700"
          >
            Your Review
          </label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your review here..."
            rows={4}
            required
          />
        </div>

        <div>
          <label
            htmlFor="difficulty"
            className="block font-medium text-gray-700"
          >
            Difficulty Rating (1-10)
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            id="difficulty"
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>Difficulty: 1 (Easiest)</option>
            {Array.from({ length: 8 }, (_, i) => (
              <option key={i + 2} value={i + 2}>
                Difficulty: {i + 2}
              </option>
            ))}
            <option value={10}>Difficulty: 10 (Hardest)</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}
