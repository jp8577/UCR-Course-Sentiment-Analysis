import nltk
print(nltk.__version__)
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA

nltk.download('vader_lexicon', quiet=True)

class Review:
    sentiment_score = 0

    def __init__(self, rating, text, date_posted):
        self.rating = rating
        self.text = text
        self.date_posted = date_posted

        # the constructor should be able to analyise the sentiment as soon as it gets the text
        self.sentiment_score = self.__analyze_sentiment(self.text)

    def __analyze_sentiment(self, text):
        analyzer = SIA()
        sentiment = analyzer.polarity_scores(text)
        return sentiment['compound']