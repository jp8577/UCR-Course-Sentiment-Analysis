from data.Review import Review

# to run, execute the following commands in your terminal
# pip install transformers
# pip install --upgrade transformers
# pip install torch

import transformers
import re
import torch
from transformers import pipeline
# summarizer = pipeline('summarization')
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6", device=0)
class Course:
    def __init__(self, course_id, avg_difficulty, review_list):
        self.course_id = course_id
        self.review_list = review_list
        self.avg_difficulty = avg_difficulty

        self.department = self.__calculate_department(self.course_id)
        self.avg_sentiment = self.__calculate_avg_sentiment(self.review_list)
        self.comment_summary = self.__summarize_comments(self.review_list)
        self.__reviews_summarized = len(self.review_list)
        self.__unsummarized_words = 0

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
            sum += review.sentiment_score
            counter += 1
        return (sum / counter)


    def __summarize_comments(self, review_list):
        '''
        The pipeline we're using cannot handle more than 1024 tokens at once which is about 700-800 words.
        Because of this, we'll have to summarize new reviews with the current summary so that we're never
        summarizing more than 700 words at once. Instead of summarizing all the reviews at once, we must
        summarize a few reviews at a time with the the current running summary.

        This will not work if a Course object is initialized with a comments worth more than 
        1024 tokens. However, our current implementation adds reviews one by one so this shouldn't
        be a problem.
        '''
        if (len(review_list) == 0): return ""
        combined_comments = self.comment_summary
        for review in review_list[self.__reviews_summarized:]:
            combined_comments = combined_comments + " " + review.text

        device = 0 if torch.cuda.is_available() else -1

        words = re.findall(r'\b\w+\b', combined_comments)
        summary = summarizer(combined_comments, max_length=len(words), min_length=0, do_sample=False)
        
        # update the indicators so we know when and how much to summarize next time
        self.__reviews_summarized = len(self.review_list)
        self.__unsummarized_words = len(self.comment_summary)
        return summary[0]['summary_text']
      
    # Methods that needed to be implemented for Database class
    def add_review(self, review):
        '''
        When we add a review, add the review to the list of reviews, review_list. We'll also need to 
        recalculate the average sentiment for the course.

        Summary recalculation is tricky. The pipeline we're using cannot process more than 1024 tokens
        at once. 1024 tokens is approximately 700-800 words. When adding a review, we won't itegrate it
        into the comment until we're about to go over the 700 word limit or we need an up to date comment
        summary (see the comment in get_comment_summary).
        '''
        if (review.text == ""):
            return

        # if the review puts us over the 700 word limit, summarize the current summary with the unsummarized reviews
        # NEVER SUMMARIZE MORE THAN 700 WORDS AT ONCE
        num_words = len(re.findall(r'\b\w+\b', review.text))
        if (self.__unsummarized_words + num_words >= 600):
            self.comment_summary = self.__summarize_comments(self.review_list)

        # add the review to review_list
        self.review_list.append(review)
        
        # increment the word counter
        self.__unsummarized_words += num_words
        
        # update the other stuff: avg_sentiment and avg_difficulty
        self.avg_sentiment = self.__calculate_avg_sentiment(self.review_list)
        self.update_avg_difficulty()
        

    def get_avg_sentiment(self):
        return self.avg_sentiment
    
    def get_comment_summary(self):
        '''
        If the current summary summarizes all of the reviews in review list, when we just return the summary.
        When adding a review, we don't summarize immediately in order to save time and information.
        If get_comment_summary is called, we want an up to date summary no matter what. The if condition
        checks if we're up to date. If the summary is up to date, we return the comment and if it's not up
        to date, we make it up to date.
        '''
        if (len(self.review_list) == 0):
            return "No comments."
        elif (self.__reviews_summarized != len(self.review_list)):
            self.comment_summary = self.__summarize_comments(self.review_list)
            self.__reviews_summarized = len(self.review_list)
        return self.comment_summary
    
    def update_avg_difficulty(self):
        if self.review_list:
            total_difficulty = sum([review.rating for review in self.review_list])
            self.avg_difficulty = total_difficulty / len(self.review_list)
        else:
            self.avg_difficulty = 0.0 
      
