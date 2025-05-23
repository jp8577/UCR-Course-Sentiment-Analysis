from data.Database import Database
from data.Course import Course
from data.Review import Review
from datetime import datetime

# to run: python -m data.test_Database
def test_database():
    print("Testing started")
    # Create a new Database instance
    db = Database()

    # Load courses from CSV (you can replace with a test CSV path if needed)
    db.load_courses_from_csv('public/UCR class difficulty database - Sheet1.csv')
    print("load_courses_from_csv() successful")

    # Check if courses loaded
    print("Loaded courses:")
    for course_id in db.courses:
        print(f"- {course_id}")
    
    # Get the course with course_id "AHS007"
    # course_id = "AHS007"
    # course = db.get_course(course_id)

    # if course:
    #     print(f"Reviews for course {course_id}:")
    #     if course.review_list:
    #         for review in course.review_list:
    #             print(f"Review: {review.text}, Rating: {review.rating}, Date: {review.date_posted}")
    #     else:
    #         print("No reviews found for this course.")
    # else:
    #     print(f"Course {course_id} not found in the database.")

    # Test adding a new course manually
    # db.add_course("TEST101", 2.5)
    # assert "TEST101" in db.courses, "TEST101 should be in courses"

    # Test adding a review to a course
    # review = Review(4, "Test review for sentiment analysis", datetime.now().strftime('%Y-%m-%d'))
    # result = db.add_review_to_course("TEST101", review)
    # assert result is True, "Should successfully add review to TEST101"
    # assert len(db.get_course("TEST101").review_list) == 1, "Review list should have 1 review"

    # Test adding a review to AHS007
    # review2 = Review(3, "The class is a bit difficult, but manageable.", datetime.now().strftime('%Y-%m-%d'))
    # result2 = db.add_review_to_course("AHS007", review2)
    # assert result2 is True, "Should successfully add first new review to AHS007"
    # assert len(db.get_course("AHS007").review_list) == 3, "Review list should have 3 reviews"

    # Test searching for a course
    # results = db.search_courses("TEST")
    # assert any(course.course_id == "TEST101" for course in results), "Search should find TEST101"

    # Test exporting summary CSV
    db.export_summary_csv("test_course_summary.csv")
    print("Exported course summary CSV successfully.")

    # Test saving courses to CSV
    output_path = "test_saved_courses.csv"
    db.save_courses_to_csv(output_path)
    print(f"Courses saved successfully to {output_path}.")

    # print("✅ All tests passed.")

if __name__ == "__main__":
    test_database()
