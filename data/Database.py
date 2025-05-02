from Course import Course
from Review import Review
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import csv
from datetime import datetime

class Database:
    def __init__(self, sheet_url, creds_path="credentials.json"):
        # Set up the Google Sheets API credentials and client
        scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
        creds = ServiceAccountCredentials.from_json_keyfile_name(creds_path, scope)
        client = gspread.authorize(creds)
        self.sheet = client.open_by_url(sheet_url).sheet1  # Open the sheet
        self.courses = {}  # Initialize an empty dictionary to store courses by course name

    def load_data(self):
        # Fetch all records from the sheet
        records = self.sheet.get_all_records()
        current_course = None  # Initially set the current course to None

        for record in records:
            # Get the course name (strip any leading/trailing spaces) and average difficulty from the record
            course_name = record['Class'].strip() if record['Class'] else None
            avg_difficulty = record['Average Difficulty']

            # Check if course_name exists. If it does, create a new Course object
            if course_name:
                current_course = Course(course_id=course_name, avg_difficulty=avg_difficulty, review_list=[])
                self.courses[course_name] = current_course  # Add it to the courses dictionary

            # If no current course, skip the review (skip any row that is not associated with a course)
            if not current_course:
                continue

            # Get review details and create a Review object
            review_text = record['Additional Comments']
            if review_text:  # Only process if there's review text
                rating = record['Difficulty']
                date_posted = record['Date']
                try:
                    date_obj = datetime.strptime(date_posted, "%m/%d/%Y")  # Convert the date string to a datetime object
                except:
                    date_obj = None  # If the date is invalid, set it as None

                # Create a Review object
                review = Review(
                    review_id=None,  # Review ID to be assigned later (if needed)
                    user_id=None,  # User ID if needed in the future
                    course_id=current_course.course_id,
                    text=review_text,
                    rating=rating,
                    difficulty=rating,
                    sentiment_score=0.0,  # Sentiment score will be computed later
                    date_posted=date_obj,
                    tags=[]
                )

                # Add the review to the current course
                current_course.add_review(review)

    def export_summary_csv(self, output_path="course_sentiment_summary.csv"):
        # Export the summary data to a CSV file
        with open(output_path, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['CourseName', 'AverageSentimentScore', 'SentimentLabel'])  # Write header row

            # Loop over each course and write a summary row
            for course_name, course in self.courses.items():
                avg_score = course.get_avg_sentiment  # Get average sentiment score for the course
                label = course.get_comment_summary  # You might want to replace this with the actual label method
                writer.writerow([course_name, round(avg_score, 3), label])  # Write course data to CSV
