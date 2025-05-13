'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8000/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;

    // Normalize input and course IDs to uppercase for comparison
    const normalizedSearch = searchTerm.trim().toUpperCase();

    const foundCourse = courses.find(
      (course) => course.course_id.toUpperCase() === normalizedSearch
    );

    if (foundCourse) {
      router.push(`/courses/${foundCourse.course_id}`);
    } else {
      // Optional: alert('Course not found!');
      console.log('Course not found.');
    }
  };

  return (
    <div className="p-6">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">UCR Course Reviews</h1>
        <p className="text-gray-600 text-lg mb-6">
          Real reviews by UCR students. Find the best classes before you enroll.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            placeholder="Search by course code or name..."
            className="border border-gray-300 rounded-lg p-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            Search
          </button>
        </div>
      </header>

      <Link href="/">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-8">
          Return to Home
        </button>
      </Link>

      {courses.length === 0 ? (
        <p>Loading courses...</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
