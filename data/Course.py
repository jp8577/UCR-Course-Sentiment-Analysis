from Review import Review

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

    def __calculate_avg_sentiment(self, reviews):
        if not reviews:
            return 0.0
        sum = 0
        counter = 0
        for review in reviews:
            sum += review.rating
            counter += 1
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
      

# temporary tests
#TODO: make more official and clean tests
# review_1 = Review(4, "Very general chemistry, just know your stuff", "3/29/2017 14:10:31")
# review_2 = Review(4, "If you passed the AP Chemistry Test in high school, this class will be a good review for you since it will cover topics from the different models of atoms, types of bonding, intermolecular forces, and stoichiometry. (You should still cover the material so you have a good foundation and an easy time in the class though) If possible, I would recommend taking it with Fokwa. Has a thick accent but sets up the class in a way that makes it super difficult to fail (you seriously need to not do anything to not get points). He has a redemption system so you can get points back if your final exam grade is much higher than your midterm exam scores. All of his exams have extra credit problems that he will give you to do before the exam day (yay!), but he has no curve. So scores on the exams depend entirely up to you. Homework is an easy 100% as long as you do it before the deadline and gives you unlimited attempts and no score penalties (unlike other professors that I have known). ", "12/14/2018 10:30:12")
# review_3 = Review(8, "Hill is hard. Try to rack up points on the quizzes and just practice alot for the midterms and final. ", "12/19/2017 11:41:30")
# review_4 = Review(9, "Avoid Bartels at all costs. This man singlehandedly made my quarter hell. Midterms are all free response sketches and you only get 30 minutes to finish. The grading system was a mess. COVID really inspired this professor to make everything even more confusing than it should be. He basically hid our grades and made them impossible to calculate until after the P/NP deadline. He also made the final exam an oral interview. If you take this class with Bartels, also expect to go beyond Chem1A, because he starts teaching OChem stuff like Mass Spectrometry. He also gives out weekly discussion homework and homework every day (including holidays and weekends). Lecture clickers are graded on accuracy. Super difficult class for intro chem.", "12/11/2020 14:08:58")
# review_list = [review_1, review_2, review_3, review_4]
# course_1 = Course("CHEM001A", 5.66, review_list)
# print("avg_difficulty:", course_1.avg_difficulty)
# print("avg_sentiment", course_1.avg_sentiment)
# print("comment summary:", course_1.comment_summary)
# print("course_id:", course_1.course_id)
# print("department:", course_1.department)
