import Link from "next/link";
import { getDifficultyEmoji } from "@/utils/difficultyEmoji";

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
    <div className="mx-auto max-w-3xl p-6">
      <header className="header">
        <h1 className="title">{course.course_id}</h1>
        <p className="subtitle">
          <strong>Average Difficulty:</strong> {course.avg_difficulty}{" "}
          {getDifficultyEmoji(Number(course.avg_difficulty))}
        </p>
      </header>

      <section className="section text-center">
        <Link href="/">
          <button className="mt-4 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
            Return to Home
          </button>
        </Link>

        <Link href="/courses">
          <button className="primary-button ml-4">Go to Courses</button>
        </Link>
      </section>

      <h2 className="mb-4 text-2xl font-semibold">Reviews:</h2>

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
            <p className="leading-relaxed text-gray-800">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
