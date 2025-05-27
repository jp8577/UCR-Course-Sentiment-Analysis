from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from pydantic import BaseModel
from typing import List
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from data.Database import Database

# to run: uvicorn api.app:app --reload


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
#db.export_summary_csv("course_summary.csv")

print(f"Loaded {len(db.courses)} courses.")

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

@app.get("/api/courses/{course_id}", response_model=Course)
def get_course(course_id: str):
    # Find the course by ID
    course = db.get_course_by_id(course_id)
    
    # If the course is not found, return a 404 error
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Convert the course and its reviews into the appropriate response format
    reviews = [
        {
            'rating': review.rating,
            'comment': review.text,
            'date_posted': review.date_posted
        } for review in course.review_list
    ]
    
    return {
        'course_id': course.course_id,
        'avg_difficulty': course.avg_difficulty,
        'reviews': reviews
    }
