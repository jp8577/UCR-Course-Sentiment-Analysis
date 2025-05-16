from data.Review import Review
from data.Course import Course
from data.Database import Database

if __name__ == "__main__":
    # test Review class
    review_1 = Review(3, "You can write WHATEVER you want, but it is a lot of writing.", "3/28/2017 15:43:18")
    # assert BOOL, "error message"
    assert review_1.rating == 3, "Incorrect rating"
    print("review_1: rating test passed")
    assert review_1.text == "You can write WHATEVER you want, but it is a lot of writing.", "Incorrect text"
    print("review_1: text test passed")
    assert review_1.date_posted == "3/28/2017 15:43:18", "Incorrect date posted"
    print("review_1: date test passed")
    assert review_1.sentiment_score <= 1 and review_1.sentiment_score >= -1, "Sentiment score is not in the correct range"
    print("review_1: sentiment_score in the appropriate range")
    print("review_1 sentiment_score:", review_1.sentiment_score)

    review_2 = Review(1, "No tests except Final is writing a story", "3/28/2017 22:41:05")
    print("\nreview_2: rating test passed")
    assert review_2.rating == 1, "Incorrect rating"
    print("review_2: text test passed")
    assert review_2.text == "No tests except Final is writing a story", "Incorrect text"
    assert review_2.date_posted == "3/28/2017 22:41:05", "Incorrect date posted"
    print("review_2: date test passed")
    assert review_2.sentiment_score <= 1 and review_2.sentiment_score >= -1, "Sentiment score is not in the correct range"
    print("review_2: sentiment_score in the appropriate range")
    print("review_2 sentiment_score:", review_2.sentiment_score)

    review_3 = Review(6, "Brandon Williams, what a guy. Lecture is 3 hours w sign in sheet. " \
    "Honestly wouldn't be that bad if he actually used the time well. He uses the lecture as " \
    "though it were a massive discussion. He spends very little time lecturing and prefers to " \
    "hear what each and every student has to say about every little sentence that he or she " \
    "found interesting in the weekly reading. 100 points total in class. 1 point per page of " \
    "writing. weekly readings w weekly response essays and \"writing practices.\" Each week " \
    "these two assignments become a page longer, starting at 1 page and capping at 5 pages. " \
    "Additionally, every 3 weeks or so, you write a story consideration (3-5 pages) in regards" \
    " to your final project (5-10 pages). 20 points come from lecture + discussion attendance. " \
    "Hated lecture, enjoyed discussion. Hated reading responses, didn't mind the other assignments." \
    " Also, idk what the final is bc he cancelled it when I took it (Fall '19).", "12/17/2019 10:58:00")
    assert review_3.rating == 6, "Incorrect rating"
    print("\nreview_3: rating test passed")
    assert review_3.text == "Brandon Williams, what a guy. Lecture is 3 hours w sign in sheet. " \
    "Honestly wouldn't be that bad if he actually used the time well. He uses the lecture as " \
    "though it were a massive discussion. He spends very little time lecturing and prefers to " \
    "hear what each and every student has to say about every little sentence that he or she " \
    "found interesting in the weekly reading. 100 points total in class. 1 point per page of " \
    "writing. weekly readings w weekly response essays and \"writing practices.\" Each week " \
    "these two assignments become a page longer, starting at 1 page and capping at 5 pages. " \
    "Additionally, every 3 weeks or so, you write a story consideration (3-5 pages) in regards" \
    " to your final project (5-10 pages). 20 points come from lecture + discussion attendance. " \
    "Hated lecture, enjoyed discussion. Hated reading responses, didn't mind the other assignments." \
    " Also, idk what the final is bc he cancelled it when I took it (Fall '19).", "Incorrect text"
    print("review_3: text test passed")
    assert review_3.date_posted == "12/17/2019 10:58:00", "Incorrect date posted"
    print("review_3: date test passed")
    assert review_3.sentiment_score <= 1 and review_3.sentiment_score >= -1, "Sentiment score is not in the correct range"
    print("review_3: sentiment_score in the appropriate range")
    print("review_3 sentiment_score:", review_3.sentiment_score)

    # test Course class
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
    print("All tests passed")