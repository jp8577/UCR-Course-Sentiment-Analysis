from data.Database import Database
from data.Review import Review
from datetime import datetime

# to run: python -m data.main

# Create a new Database instance
db = Database()

# Load courses from CSV (you can replace with a test CSV path if needed)
db.load_courses_from_csv('public/UCR class difficulty database - Sheet1.csv')

db.export_summary_csv()