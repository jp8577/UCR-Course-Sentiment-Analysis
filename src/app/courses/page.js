'use client' // if you're using the App Router

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Course List</h1>

      <Link href="/">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4">
          Return to Home
        </button>
      </Link>

      {courses.length === 0 ? (
        <p>Loading courses...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <Link key={course.course_id} href={`/courses/${course.course_id}`} passHref>
              <div className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <h2 className="text-xl font-semibold text-gray-800">{course.course_id}</h2>
                <p className="text-gray-600">Avg Difficulty: {course.avg_difficulty}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
