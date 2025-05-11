from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from data.Database import Database

# to run: uvicorn api.main:app --reload --host 0.0.0.0 --port 8000


# FastAPI app instance
app = FastAPI()

# CORS middleware (if calling from a frontend like Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
db = Database()
db.load_courses_from_csv('public/UCR class difficulty database - Sheet1.csv')

# Pydantic models
class Review(BaseModel):
    rating: float
    comment: str
    date_posted: str

class Course(BaseModel):
    course_id: str
    avg_difficulty: float
    reviews: List[Review]

# Routes
@app.get("/")
def read_root():
    return {"message": "API is running with FastAPI!"}

@app.get("/api/courses", response_model=List[Course])
def get_courses():
    courses = db.get_all_courses()
    course_data = []
    for course in courses:
        reviews = [
            {
                'rating': review.rating,
                'comment': review.text,
                'date_posted': review.date_posted
            } for review in course.review_list
        ]
        course_data.append({
            'course_id': course.course_id,
            'avg_difficulty': course.avg_difficulty,
            'reviews': reviews
        })
    return course_data
