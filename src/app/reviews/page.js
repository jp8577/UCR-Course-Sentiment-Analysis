"use client";

import { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

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

    try {
      const res = await fetch("/api/submitReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        toast.success("Review submitted successfully!");
        setCourseCode("");
        setReviewText("");
        setDifficulty(1);
      } else {
        toast.error("Failed to submit the review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">Submit a Review</h1>
        <p className="text-lg text-gray-600">
          Help others choose the best classes by sharing your experience.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md space-y-6"
      >
        <div>
          <label htmlFor="courseCode" className="block mb-1 font-semibold text-gray-700">
            Course Code
          </label>
          <input
            type="text"
            id="courseCode"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            placeholder="e.g., CS180"
            required
            className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="reviewText" className="block mb-1 font-semibold text-gray-700">
            Your Review
          </label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            rows={5}
            required
            className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="difficulty" className="block mb-1 font-semibold text-gray-700">
            Difficulty Rating (1 = Easiest, 10 = Hardest)
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Difficulty: {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:underline font-medium">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
