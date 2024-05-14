import json
from kafka import KafkaConsumer
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from scipy.sparse import hstack

from pymongo import MongoClient
import datetime

# Connect to the MongoDB server (default is localhost on port 27017)
client = MongoClient("mongodb://localhost:27017/")

# Access your database
db = client["recommendation_db"]

# Access your collection where you'll store recommendations
recommendations_collection = db["recommendations"]

# Sample initial data (should be loaded from your database or data storage)
# data = {
#     "book_id": [1, 2, 3, 4, 5],
#     "title": ["Book A", "Book B", "Book C", "Book D", "Book E"],
#     "description": [
#         "Fantasy adventure magic dragons",
#         "Science fiction space stars",
#         "Historical fiction war love",
#         "Romance novel love",
#         "Mystery thriller suspense",
#     ],
#     "clicks": [10, 20, 30, 40, 50],
#     "ratings": [4.0, 3.5, 4.5, 4.0, 3.0],
#     "likes": [100, 200, 300, 400, 500],
#     "orders": [10, 20, 30, 40, 50],
# }

data = {
    "book_id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    "title": [
        "High Stakes",
        "Islands of Magic",
        "Hearts Aligned",
        "Fear's Grip",
        "Wizards and War",
        "Dark Pursuits",
        "Stars and Beyond",
        "The Emperor's Will",
        "Love in War",
        "Fear's Grip",
        "Stars and Beyond",
        "Mysterious Shadows",
        "Fear's Grip",
        "Love in War",
        "Warriors of Past",
        "Wizards and War",
        "Dark Pursuits",
        "Hearts Aligned",
        "Fear's Grip",
        "The Hidden Truth",
    ],
    "description": [
        "Thriller themed, involving elements like war",
        "Fantasy themed, involving elements like betrayal",
        "Romance themed, involving elements like war",
        "Thriller themed, involving elements like mystery",
        "Fantasy themed, involving elements like mystery",
        "Thriller themed, involving elements like war",
        "Science Fiction themed, involving elements like betrayal",
        "Historical Fiction themed, involving elements like war",
        "Historical Fiction themed, involving elements like love",
        "Thriller themed, involving elements like adventure",
        "Science Fiction themed, involving elements like mystery",
        "Mystery themed, involving elements like war",
        "Thriller themed, involving elements like war",
        "Historical Fiction themed, involving elements like betrayal",
        "Historical Fiction themed, involving elements like adventure",
        "Fantasy themed, involving elements like mystery",
        "Thriller themed, involving elements like love",
        "Romance themed, involving elements like betrayal",
        "Thriller themed, involving elements like love",
        "Mystery themed, involving elements like mystery",
    ],
    "clicks": [
        270,
        160,
        330,
        210,
        170,
        470,
        10,
        340,
        360,
        0,
        180,
        330,
        260,
        180,
        120,
        290,
        310,
        130,
        20,
        110,
    ],
    "ratings": [
        5.0,
        3.5,
        3.0,
        3.0,
        5.0,
        3.0,
        4.0,
        3.5,
        3.5,
        3.0,
        4.0,
        4.0,
        3.5,
        3.5,
        4.5,
        4.5,
        3.5,
        5.0,
        4.0,
        5.0,
    ],
    "likes": [
        3900,
        4700,
        2300,
        3900,
        200,
        1400,
        300,
        5000,
        1300,
        1700,
        4800,
        1400,
        500,
        3600,
        1900,
        2600,
        800,
        1900,
        3000,
        3000,
    ],
    "orders": [
        0,
        100,
        0,
        100,
        0,
        100,
        100,
        0,
        100,
        100,
        0,
        100,
        0,
        0,
        0,
        100,
        100,
        0,
        0,
        100,
    ],
}

df_books = pd.DataFrame(data)

# TF-IDF Vectorizer initialization
tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(df_books["description"])

# Feature scaling
scaler = MinMaxScaler()
interaction_matrix = scaler.fit_transform(
    df_books[["clicks", "ratings", "likes", "orders"]]
)
features_matrix = hstack([tfidf_matrix, interaction_matrix])


def predictor(clicks, ratings, likes, orders, user_id, book_id):
    # Update df_books with new interaction (this is a simplified example)
    df_books.loc[
        df_books["book_id"] == book_id, ["clicks", "ratings", "likes", "orders"]
    ] += [clicks, ratings, likes, orders]

    # Recalculate features and similarity matrix (not efficient for large-scale use)
    tfidf_matrix = tfidf.fit_transform(df_books["description"])
    interaction_matrix = scaler.fit_transform(
        df_books[["clicks", "ratings", "likes", "orders"]]
    )
    features_matrix = hstack([tfidf_matrix, interaction_matrix])
    # ---
    num_recommendations = 3
    # Check if the book_id is valid
    if book_id not in df_books["book_id"].values:
        return "Book ID not found in the database"

    # Find the index of the book in the DataFrame
    book_idx = df_books.index[df_books["book_id"] == book_id].tolist()[0]

    # Calculate cosine similarity for the book
    cosine_sim = cosine_similarity(features_matrix, features_matrix)

    # Get the pairwise similarity scores of all books with that book
    sim_scores = list(enumerate(cosine_sim[book_idx]))

    # Sort the books based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the scores of the most similar books
    sim_scores = sim_scores[
        1 : num_recommendations + 1
    ]  # skip the first one as it is the book itself

    # Get the book indices
    book_indices = [i[0] for i in sim_scores]

    # Return the top most similar books
    recommended_books = df_books.iloc[book_indices]["title"].tolist()
    

    # ---
    # Prepare the recommendation data to save
    recommendation_data = {
        "user_id": user_id,
        "book_id": book_id,
        "recommended_books": recommended_books,
        "timestamp": datetime.datetime.now(),
    }

    print("dfdsfdsf",recommendation_data)
    filters = {"user_id": user_id}
    # Save the recommendation to MongoDB
    # recommendations_collection.insert_one(recommendation_data)
    new_values = {"$set": recommendation_data}

    result = recommendations_collection.update_one(filters, new_values, upsert=True)

    return recommended_books


# def predictor(clicks, ratings, likes, orders, user_id, book_id):
#     # Update df_books with new interaction (this is a simplified example)
#     df_books.loc[
#         df_books["book_id"] == book_id, ["clicks", "ratings", "likes", "orders"]
#     ] += [clicks, ratings, likes, orders]

#     # Recalculate features and similarity matrix (not efficient for large-scale use)
#     tfidf_matrix = tfidf.fit_transform(df_books["description"])
#     interaction_matrix = scaler.fit_transform(
#         df_books[["clicks", "ratings", "likes", "orders"]]
#     )
#     features_matrix = hstack([tfidf_matrix, interaction_matrix])
#     cosine_sim = cosine_similarity(features_matrix, features_matrix)

#     # Example of recommending books (this would be a more complex function in a real system)
#     recommended_books = df_books.iloc[cosine_sim[user_id].argsort()[-3:][::-1]][
#         "title"
#     ].tolist()

#     # Prepare the recommendation data to save
#     recommendation_data = {
#         "user_id": user_id,
#         "recommended_books": recommended_books,
#         "timestamp": datetime.datetime.now(),
#     }

#     # Save the recommendation to MongoDB
#     recommendations_collection.insert_one(recommendation_data)

#     return recommended_books
