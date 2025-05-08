import unittest
import os
import csv
from data.Database import Database

# Stub/mock Course class (only needed if the real one is not available during test)
class Course:
    def __init__(self, course_id, avg_difficulty, review_list):
        self.course_id = course_id
        self.avg_difficulty = avg_difficulty
        self.review_list = review_list

    def get_avg_sentiment(self):
        return 0.0  # dummy value for testing

    def get_comment_summary(self):
        return "Neutral"  # dummy value for testing

class TestDatabase(unittest.TestCase):

    def setUp(self):
        # Create a temporary test CSV file
        self.test_csv_path = 'test_courses.csv'
        with open(self.test_csv_path, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['Class', 'avg_difficulty'])
            writer.writerow(['CS101', 2.5])
            writer.writerow(['CS102', 3.0])
            writer.writerow(['CS103', 4.1])

        self.db = Database()

    def tearDown(self):
        # Remove the test CSV file after the test
        if os.path.exists(self.test_csv_path):
            os.remove(self.test_csv_path)

    def test_load_courses_from_csv(self):
        self.db.load_courses_from_csv(self.test_csv_path)

        self.assertEqual(len(self.db.courses), 3)
        self.assertIn('CS101', self.db.courses)
        self.assertEqual(self.db.courses['CS101'].avg_difficulty, 2.5)
        self.assertEqual(self.db.courses['CS102'].avg_difficulty, 3.0)
        self.assertEqual(self.db.courses['CS103'].avg_difficulty, 4.1)
    
    def test_export_summary_csv(self):
        # Use stubbed Course instances with mocked sentiment methods
        self.db.courses = {
            'CS101': Course('CS101', 2.5, []),
            'CS102': Course('CS102', 3.0, []),
        }

        # Override the methods to simulate sentiment values
        self.db.courses['CS101'].get_avg_sentiment = lambda: 0.6
        self.db.courses['CS101'].get_comment_summary = lambda: "Positive"
        self.db.courses['CS102'].get_avg_sentiment = lambda: 0.2
        self.db.courses['CS102'].get_comment_summary = lambda: "Negative"

        output_path = 'test_summary_output.csv'
        self.db.export_summary_csv(output_path)

        # Read and validate the output
        with open(output_path, mode='r', newline='') as file:
            reader = csv.reader(file)
            rows = list(reader)

            # Check header
            self.assertEqual(rows[0], ['CourseName', 'AverageSentimentScore', 'SentimentLabel'])

            # Check content rows
            self.assertIn(['CS101', '0.6', 'Positive'], rows)
            self.assertIn(['CS102', '0.2', 'Negative'], rows)

        # Clean up
        if os.path.exists(output_path):
            os.remove(output_path)

if __name__ == '__main__':
    unittest.main()
