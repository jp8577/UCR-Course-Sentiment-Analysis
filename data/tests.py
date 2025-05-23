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
    print("review_1 sentiment_score:", review_1.sentiment_score)

    review_2 = Review(1, "No tests except Final is writing a story", "3/28/2017 22:41:05")
    print("\nreview_2: rating test passed")
    assert review_2.rating == 1, "Incorrect rating"
    print("review_2: text test passed")
    assert review_2.text == "No tests except Final is writing a story", "Incorrect text"
    assert review_2.date_posted == "3/28/2017 22:41:05", "Incorrect date posted"
    print("review_2: date test passed")
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
    print("review_3 sentiment_score:", review_3.sentiment_score)
    pass

    