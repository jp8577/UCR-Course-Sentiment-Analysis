import Link from 'next/link';

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

export default async function CoursePage(props) {
  const { courseId } = await props.params;
  const course = await getCourseData(courseId);

  if (!course) {
    return <div className="text-center text-red-500 mt-10">Course not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      
      <header className="header">
        <h1 className="title">{course.course_id}</h1>
        <p className="subtitle">
          <strong>Average Difficulty:</strong> {course.avg_difficulty}
        </p>
      </header>
      
      <section className="section text-center">
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4">
            Return to Home
          </button>
        </Link>
      
        <Link href="/courses">
          <button className="primary-button ml-4">Go to Courses</button>
        </Link>
      </section>  

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
