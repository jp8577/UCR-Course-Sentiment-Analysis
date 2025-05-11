export async function generateStaticParams() {
  const res = await fetch('http://localhost:8000/api/courses');
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

export default async function CoursePage({ params }) {
  const course = await getCourseData(params.courseId);

  if (!course) {
    return <div className="text-center text-red-500 mt-10">Course not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{course.course_id}</h1>
      <p className="text-lg mb-8 text-gray-700">
        <strong>Average Difficulty:</strong> {course.avg_difficulty}
      </p>

      <h2 className="text-2xl font-semibold mb-4">Reviews:</h2>

      <div className="space-y-6">
        {course.reviews.map((review, index) => (
          <div key={index} className="border border-gray-300 rounded-xl p-5 shadow-sm bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 text-sm">📅 {review.date_posted}</span>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Difficulty: {review.rating}
              </span>
            </div>
            <p className="text-gray-800 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
