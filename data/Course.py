from data.Review import Review

# to run, execute the following commands in your terminal
# pip install transformers
# pip install --upgrade transformers
# pip install torch

import re
import torch
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

    def __calculate_avg_sentiment(self, reviews):
        if not reviews:
            return 0.0
        sum = 0
        counter = 0
        for review in reviews:
            # sum += review.rating
            sum += review.sentiment_score
            counter += 1
        # print("sentiment found:", (sum / counter))
        return (sum / counter)


    def __summarize_comments(self, review_list):
        if (len(review_list) == 0): return ""
        combined_comments = ""
        for review in review_list:
            combined_comments = combined_comments + " " + review.text

        device = 0 if torch.cuda.is_available() else -1
        # summarizer = pipeline('summarization')
        summarizer = pipeline('summarization', device=device)
        words = re.findall(r'\b\w+\b', combined_comments)
        summary = summarizer(combined_comments, max_length=len(words), min_length=0, do_sample=False)
        return summary[0]['summary_text']
      
    # Methods that needed to be implemented for Database class
    def add_review(self, review):
        self.review_list.append(review)
        self.avg_sentiment = self.__calculate_avg_sentiment(self.review_list)
        self.comment_summary = self.__summarize_comments(self.review_list)
        #self.update_avg_difficulty()
        

    def get_avg_sentiment(self):
        return self.avg_sentiment
    
    def get_comment_summary(self):
        return self.comment_summary
    
    def update_avg_difficulty(self):
        if self.review_list:
            total_difficulty = sum([review.rating for review in self.review_list])
            self.avg_difficulty = total_difficulty / len(self.review_list)
        else:
            self.avg_difficulty = 0.0 
      
