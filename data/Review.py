import nltk
print(nltk.__version__)
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA

# Download required datasets only if they aren't already present
df_punkt = nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)
print(df_punkt)

class Review:
    sentiment_score = 0

    def __init__(self, rating, text, date_posted):
        self.rating = rating
        self.text = text
        self.date_posted = date_posted

        # the constructor should be able to analyise the sentiment as soon as it gets the text
        sentiment_score = self.__analyze_sentiment(text)

    def __analyze_sentiment(text):
        analyzer = SIA()
        analyzer.polarity_scores(text)

