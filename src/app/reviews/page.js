"use client";
import { useState } from "react";

export default function ReviewForm() {
  const [courseId, setCourseId] = useState("");
  const [rating, setRating] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseId || !rating || !text) {
      setStatus("Please fill all fields.");
      return;
    }

    const reviewData = {
      course_id: courseId,
      rating: parseFloat(rating),
      text: text,
    };

    try {
      const res = await fetch("http://localhost:8000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        setStatus("✅ Review submitted successfully!");
        setCourseId("");
        setRating("");
        setText("");
      } else {
        const data = await res.json();
        setStatus(`❌ Error: ${data.message || "Failed to submit review"}`);
      }
    } catch (error) {
      setStatus(`❌ Error submitting review: ${error}`);
    }
  };

  const boxStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "16px",
    backgroundColor: "#f9f9f9",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: "20px" }}>
      <header className="mb-10 text-center">
        <h1 className="mb-2 text-4xl font-extrabold text-blue-700">
          Submit a Review
        </h1>
        <p className="text-lg text-gray-600">
          Help others choose the best classes by sharing your experience.
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <div style={boxStyle}>
          <label htmlFor="courseId" style={labelStyle}>
            Course ID:
          </label>
          <input
            id="courseId"
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={boxStyle}>
          <label htmlFor="rating" style={labelStyle}>
            Difficulty Rating (1-10):
          </label>
          <input
            id="rating"
            type="number"
            min="1"
            max="10"
            step="1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={boxStyle}>
          <label htmlFor="reviewText" style={labelStyle}>
            Review:
          </label>
          <textarea
            id="reviewText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="5"
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Submit Review
        </button>
      </form>

      {status && (
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {status}
        </p>
      )}
    </div>
  );
}
