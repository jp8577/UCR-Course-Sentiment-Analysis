from data.Review import Review

# to run, execute the following commands in your terminal
# pip install transformers
# pip install --upgrade transformers
# pip install torch

import transformers
from transformers import pipeline
# summarizer = pipeline('summarization')

class Course:
    def __init__(self, course_id, avg_difficulty, review_list):
        self.course_id = course_id
        self.review_list = review_list
        self.avg_difficulty = avg_difficulty

        self.department = self.__calculate_department(self.course_id)
        self.avg_sentiment = self.__calculate_avg_sentiment(self.review_list)
        self.comment_summary = self.__summarize_comments(self.review_list)

    def __calculate_department(self, course_id):
        letters = ""
        for char in course_id:
            if char.isalpha():
                letters += char
            else:
                break
        return letters

    def __calculate_avg_sentiment(self, review_list):
        counter = 0
        sum = 0
        for review in review_list:
            counter += 1
            sum += review.sentiment_score
        return (sum / counter)

    def __summarize_comments(self, review_list):
        if (len(review_list) == 0): return ""
        combined_comments = ""
        for review in review_list:
            combined_comments = combined_comments + " " + review.text

        summarizer = pipeline('summarization')
        summary = summarizer(combined_comments, max_length=130, min_length=25, do_sample=False)
        return summary[0]['summary_text']
      
    # Methods that needed to be implemented for Database class
    def add_review(self, review):
        self.review_list.append(review)

    def get_avg_sentiment(self):
        return self.avg_sentiment
    
    def get_comment_summary(self):
        return self.comment_summary