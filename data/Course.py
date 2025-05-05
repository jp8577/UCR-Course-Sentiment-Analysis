from Review import Review

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
        return letters

    def __calculate_avg_sentiment(self, review_list):
        # TODO: iterate through the list of Reviews and average their sentiment
        pass

    def __summarize_comments(self, summarize_comments):
        # TODO: summarize all of the comments
        pass

    # Methods that needed to be implemented for Database class

    def add_review(self, review):
        self.review_list.append(review)

    def get_avg_sentiment(self):
        return self.avg_sentiment
    
    def get_comment_summary(self, review_list):
        return self.comment_summary