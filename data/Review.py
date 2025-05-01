class Review:
    sentiment_score = 0

    def __init__(self, rating, text, date_posted):
        self.rating = rating
        self.text = text
        self.date_posted = date_posted

        # the constructor should be able to analyise the sentiment as soon as it gets the text
        sentiment_score = self.__analyze_sentiment(text)

    def __analyze_sentiment(text):
        pass