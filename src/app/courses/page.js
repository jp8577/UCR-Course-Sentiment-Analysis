// pages/courses.js
import { useEffect, useState } from 'react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the Flask API
    const fetchCourses = async () => {
      const response = await fetch('http://localhost:5000/api/courses');
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    };
    
    fetchCourses();
  }, []);

  if (loading) return <div>Loading courses...</div>;

  return (
    <div>
      <h1>All Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.course_id}>
            <h2>{course.course_id}</h2>
            <p>Average Difficulty: {course.avg_difficulty}</p>
            <h3>Reviews:</h3>
            <ul>
              {course.reviews.length === 0 ? (
                <li>No reviews available</li>
              ) : (
                course.reviews.map((review, index) => (
                  <li key={index}>
                    <p>{review.comment}</p>
                    <p>Rating: {review.rating}</p>
                    <p>Date Posted: {review.date_posted}</p>
                  </li>
                ))
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
