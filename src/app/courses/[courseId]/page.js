import { getDifficultyEmoji } from "@/utils/difficultyEmoji";
import { getSentimentEmoji } from "@/utils/sentimentEmoji";
import CourseSummary from "@/components/CourseSummary";

export async function generateStaticParams() {
  const res = await fetch("http://localhost:8000/api/courses");
  const courses = await res.json();

  return courses.map((course) => ({
    courseId: course.course_id,
  }));
}

async function getCourseData(courseId) {
  const res = await fetch(`http://localhost:8000/api/courses`);
  const courses = await res.json();
  return courses.find((c) => c.course_id === courseId);
}

export default async function CoursePage(props) {
  const { courseId } = await props.params;
  const course = await getCourseData(courseId);

  if (!course) {
    return (
      <div className="mt-10 text-center text-red-500">Course not found.</div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-5">
      <header className="course-header text-center">
        <h1 className="title mt-4">{course.course_id}</h1>
        <p className="subtitle">
          <strong>Average Difficulty:</strong>{" "}
          {Number(course.avg_difficulty).toFixed(2)}{" "}
          {getDifficultyEmoji(Number(course.avg_difficulty))}
        </p>
        <p className="subtitle mt-1">
          <strong>Sentiment Score:</strong>{" "}
          <span style={{ fontSize: "1.5rem", marginLeft: "0.5rem" }}>
            {getSentimentEmoji(Number(course.avg_sentiment))}
          </span>
        </p>

        <CourseSummary courseId={course.course_id} />
        <a href="/courses" className="subtitle-search">
          ← Back to Courses
        </a>
      </header>

      <h2 className="mb-4 mt-4 text-2xl font-semibold">Reviews:</h2>

      <div className="space-y-6">
        {course.reviews.map((review, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                📅 {review.date_posted}
              </span>
              <span className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-800">
                Difficulty: {review.rating}
              </span>
            </div>
            <p className="leading-relaxed text-gray-800">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
