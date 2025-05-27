import Link from "next/link";
import { getDifficultyEmoji } from "@/utils/difficultyEmoji";
import CourseSummary from "@/components/CourseSummary";

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
              {getDifficultyEmoji(Number(course.avg_difficulty))}
            </p>
            <p className="text-sm text-gray-600">
              {course.reviews.length} reviews
            </p>
            <CourseSummary courseId={course.course_id} />
          </div>
        </Link>
      ))}
    </div>
  );
}
