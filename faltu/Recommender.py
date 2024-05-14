import json
from kafka import KafkaConsumer
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from scipy.sparse import hstack

# Sample initial data (should be loaded from your database or data storage)
data = {
    "song_id": [1, 2, 3, 4, 5],
    "title": ["Book A", "Book B", "Book C", "Book D", "Book E"],
    "description": [
        "Fantasy adventure magic dragons",
        "Science fiction space stars",
        "Historical fiction war love",
        "Romance novel love",
        "Mystery thriller suspense",
    ],
    "clicks": [10, 20, 30, 40, 50],
    "ratings": [4.0, 3.5, 4.5, 4.0, 3.0],
    "likes": [100, 200, 300, 400, 500],
    "orders": [10, 20, 30, 40, 50],
}

df_books = pd.DataFrame(data)

# TF-IDF Vectorizer initialization
# to vectorize the description
tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(df_books["description"])

# Feature scaling
scaler = MinMaxScaler()
interaction_matrix = scaler.fit_transform(
    df_books[["clicks", "ratings", "likes", "orders"]]
)
features_matrix = hstack([tfidf_matrix, interaction_matrix])


def predictor(clicks, ratings, likes, orders, user_id, song_id):
    # Update df_books with new interaction (this is a simplified example)
    df_books.loc[
        df_books["song_id"] == song_id, ["clicks", "ratings", "likes", "orders"]
    ] += [clicks, ratings, likes, orders]

    # Recalculate features and similarity matrix (not efficient for large-scale use)
    tfidf_matrix = tfidf.fit_transform(df_books["description"])
    interaction_matrix = scaler.fit_transform(
        df_books[["clicks", "ratings", "likes", "orders"]]
    )
    features_matrix = hstack([tfidf_matrix, interaction_matrix])
    cosine_sim = cosine_similarity(features_matrix, features_matrix)

    # Example of recommending books (this would be a more complex function in a real system)
    recommended_books = df_books.iloc[cosine_sim[user_id].argsort()[-3:][::-1]][
        "title"
    ].tolist()

    return recommended_books
