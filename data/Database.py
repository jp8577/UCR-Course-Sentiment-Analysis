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

        for record in records:
            # Get the course name (strip any leading/trailing spaces) and average difficulty from the record
            course_name = record['Class'].strip() if record['Class'] else None
            avg_difficulty = record['Average Difficulty']

            # If no current course name (skip any row that is not that does not have a course)
            if not current_course:
                continue

            # Check if course_name exists. If it does, create a new Course object
            if course_name not in self.courses:
                current_course = Course(
                    course_id=course_name, 
                    avg_difficulty=avg_difficulty, 
                    review_list=[]
                )
                self.courses[course_name] = current_course  # Add it to the courses dictionary

        

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