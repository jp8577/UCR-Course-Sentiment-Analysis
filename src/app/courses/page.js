'use client' // if you're using the App Router

import { useEffect, useState } from 'react';

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

      {courses.length === 0 ? (
        <p>Loading courses...</p>
      ) : (
        <ul className="space-y-4">
          {courses.map(course => (
            <li key={course.course_id} className="p-4 border rounded-lg shadow">
              <h2 className="text-xl font-semibold">{course.course_id}</h2>
              <p>Average Difficulty: {course.avg_difficulty}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
