from data.Course import Course
import csv
from datetime import datetime

class Database:
    def __init__(self):
        self.courses = {}  # Initialize an empty dictionary to store courses by course name

    def load_courses_from_csv(self, filepath='public/UCR class difficulty database - Sheet1.csv'):
        try:
            with open(filepath, mode='r', newline='', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    course_id = row['Class']
                    avg_difficulty = float(row.get('avg_difficulty', 0.0))
                    review_list = []  # You can populate this later if needed

                    course = Course(course_id, avg_difficulty, review_list)
                    self.courses[course_id] = course
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