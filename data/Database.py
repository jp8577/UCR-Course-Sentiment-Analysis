from data.Course import Course
from data.Review import Review
import csv
from datetime import datetime

class Database:
    def __init__(self):
        self.courses = {}  # Initialize an empty dictionary to store courses by course name

    def load_courses_from_csv(self, filepath='public/UCR class difficulty database - Sheet1.csv'):
        try:
            with open(filepath, mode='r', newline='', encoding='utf-8') as file:
                reader = csv.DictReader(file)

                # these are the 3 things needed to create a Course object
                current_course = None
                avg_difficulty = 0.0
                reviews = []

                row_num = 1
                for row in reader:

                    # this skips the first 2 rows of the cvs which is just the titles and some messages
                    if (row_num == 1 or row_num == 2):
                        row_num += 1
                    else:
                        course_id = row['Class'].strip()

                        if (course_id != '' and (row.get('Additional Comments', '') == '' and row.get('Difficulty', '') == '' and row.get('Date', '') == '')):
                            print("Skipping ", course_id, ". ", row.get('Average Difficulty', ''), sep="")
                        elif (course_id or (row.get('Additional Comments', '') == '' and row.get('Difficulty', '') == '' and row.get('Date', '') == '')):
                            # process the old class
                            if (current_course != None):
                                new_course = Course(current_course, avg_difficulty, reviews)
                                self.courses[current_course] = new_course
                                reviews.clear()

                            # start with the new class
                            current_course = course_id
                            avg_difficulty = float(row.get('Average Difficulty'))
                        
                        comment_text = row.get('Additional Comments', '').strip()
                        difficulty = float(row.get('Difficulty', '').strip())
                        date_posted = row.get('Date', '').strip()
                        new_review = Review(difficulty, comment_text, date_posted)
                        reviews.append(new_review)





                        # # If there's a new course, create it and store in dict
                        # if course_id:
                        #     try:
                        #         avg_difficulty = float(row.get('Average Difficulty'))
                        #         current_course = Course(course_id, avg_difficulty, [])
                        #         self.courses[course_id] = current_course
                        #     except ValueError:
                        #         # Skip this course if avg_difficulty cannot be converted to a float
                        #         print(f"Skipping course {course_id} due to invalid average difficulty: {row.get('Average Difficulty')}")
                        #         current_course = None  # Reset current course
                        #         continue  # Skip to the next course


                        # # If no course has been initialized yet (i.e. first row was invalid)
                        # if current_course is None:
                        #     continue

                        # # Process additional comments if present
                        # comment_text = row.get('Additional Comments', '').strip()
                        # if comment_text:
                        #     difficulty_str = row.get('Difficulty', '').strip()

                        # # Check if difficulty is a valid number and not empty
                        # if difficulty_str:
                        #     try:
                        #         rating = float(difficulty_str)
                        #         date_posted = row.get('Date')
                        #         review = Review(rating, comment_text, date_posted)
                        #         current_course.add_review(review)
                        #     except ValueError:
                        #         # Skip this review if Difficulty cannot be converted to a float
                        #         print(f"Skipping review for course {course_id} due to invalid rating: {difficulty_str}")
                        # else:
                        #     # Skip review if difficulty is empty
                        #     print(f"Skipping review for course {course_id} due to missing difficulty rating")


        except FileNotFoundError:
            print(f"File not found: {filepath}")
        except KeyError as e:
            print(f"Missing expected column in CSV: {e}")
        except Exception as e:
            print(f"Error loading courses: {e}")


    def export_summary_csv(self, output_path="course_sentiment_summary.csv"):
        # Export the summary data to a CSV file
        with open(output_path, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['CourseName', 'AverageSentimentScore', 'SentimentLabel'])  # Write header row

            # Loop over each course and write a summary row
            for course_name, course in self.courses.items():
                avg_score = course.get_avg_sentiment()  # Get average sentiment score for the course
                comment_summary = course.get_comment_summary()  # You might want to replace this with the actual label method
                writer.writerow([course_name, round(avg_score, 3), comment_summary])  # Write course data to CSV


    def get_course(self, course_id):
        return self.courses.get(course_id)
    
    def get_all_courses(self):
        return list(self.courses.values())
    
    def search_courses(self, query):
        return [course for course in self.courses.values() if query.lower() in course.course_id.lower()]

    def add_course(self, course_id, avg_difficulty=1.0):
        if course_id not in self.courses:
            self.courses[course_id] = Course(course_id, avg_difficulty, [])
            self.save_courses_to_csv()  # Save after adding course


    def add_review_to_course(self, course_id, review, default_difficulty=3.0):
        course = self.get_course(course_id)
        if course:
            course.add_review(review)
        else:
            # If course doesn't exist, create it with a default difficulty
            self.add_course(course_id, default_difficulty)
            self.get_course(course_id).add_review(review)
        
        self.save_courses_to_csv()  # Save after adding review (and course if needed)
        return True
    
    def get_course_by_id(self, course_id: str):
        for course in self.courses:
            if course.course_id == course_id:
                return course
        return None  # If no course is found
    
    import csv

    def save_courses_to_csv(self, output_path="saved_courses.csv"):
        # Open a file for writing
        with open(output_path, mode='w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            
            # Write the header row
            writer.writerow(['Class', 'Average Difficulty', 'Additional Comments', 'Difficulty', 'Date'])

            # Keep track of which courses have already had their course_id written
            written_courses = set()

            # Iterate through courses and their reviews
            for course in self.courses.values():
                for i, review in enumerate(course.review_list):
                    # Check if this course has been written before
                    if course.course_id not in written_courses:
                        # For the first review of each course, include the course_id in the 'Class' column
                        writer.writerow([course.course_id, course.avg_difficulty, review.text, review.rating, review.date_posted])
                        # Mark this course as written
                        written_courses.add(course.course_id)
                    else:
                        # For subsequent reviews, leave the 'Class' column empty
                        writer.writerow(["", course.avg_difficulty, review.text, review.rating, review.date_posted])

        print(f"Courses saved successfully to {output_path}.")
