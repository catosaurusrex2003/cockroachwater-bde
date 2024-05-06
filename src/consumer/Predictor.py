import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from scipy.sparse import hstack

# Sample initial data (loaded from your database or data storage)
data = {
    "book_id": [1, 2, 3, 4, 5],
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
tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(df_books["description"])

# Feature scaling
scaler = MinMaxScaler()
interaction_matrix = scaler.fit_transform(
    df_books[["clicks", "ratings", "likes", "orders"]]
)
# features_matrix = hstack([tfidf_matrix, interaction_matrix])
features_matrix = hstack([tfidf_matrix, interaction_matrix]).tolil()

def update_interactions(clicks, ratings, likes, orders, book_id):
    # Properly update interaction metrics for a specific book
    indices = df_books.index[df_books['book_id'] == book_id]
    if not indices.empty:
        idx = indices[0]
        df_books.at[idx, 'clicks'] += clicks
        df_books.at[idx, 'ratings'] = (df_books.at[idx, 'ratings'] + ratings) / 2  # Average rating example
        df_books.at[idx, 'likes'] += likes
        df_books.at[idx, 'orders'] += orders

        # Recompute interaction features only for the updated book
        interaction_vector = scaler.transform([df_books.loc[idx, ['clicks', 'ratings', 'likes', 'orders']].values])
        tfidf_vector = tfidf.transform([df_books.loc[idx, 'description']])
        book_features = hstack([tfidf_vector, interaction_vector]).tocsr()

        # Update the global feature matrix
        features_matrix[idx] = book_features

def recommend_books(book_id):
    # Convert features_matrix to csr for efficient calculations if not already
    features_csr = features_matrix.tocsr()

    # Find the index of the book
    book_idx = df_books.index[df_books['book_id'] == book_id][0]

    # Calculate cosine similarity for the specified book against all others
    cosine_sim = cosine_similarity(features_csr[book_idx], features_csr).flatten()
    # Find the indices of the books with the highest similarity scores, excluding the book itself
    recommended_indices = cosine_sim.argsort()[-4:][::-1]
    recommended_indices = recommended_indices[recommended_indices != book_idx]  # Exclude itself
    recommended_books = df_books.iloc[recommended_indices]['title'].tolist()

    return recommended_books


def predictor(clicks, ratings, likes, orders, user_id, book_id):
    update_interactions(clicks, ratings, likes, orders, book_id)
    something = recommend_books(book_id)
    return something


# Example usage
# update_interactions(5, 4.7, 150, 25, 3)  # Simulate updating book with ID 3
# print(recommend_books(3))  # Recommend books similar to book ID 3
