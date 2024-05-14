import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from scipy.sparse import hstack

# initial songs data 
data = {
    "song_id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "title": [
        "Thriller - Michael Jackson",
        "All Along the Watchtower - John Wesley",
        "Nuthin' But a 'G' Thang - Dr. Dre & Snoop Dogg",
        "Lean On - Major Lazer & DJ Snake ft. MØ",
        "Always on My Mind - Elvis Presley",
        "Old Town Road - Lil Nas X",
        "Für Elise - Ludwig van Beethoven",
        "The Real Slim Shady - Eminem",
        "Where Are Ü Now - Jack Ü & Justin Bieber",
        "California Dreamin' - The Mamas and the Papas"
    ],
    "description": [
        "Iconic pop song known for its infectious rhythm, catchy melody, and spooky lyrics. A cultural phenomenon, especially during Halloween.",
        "is a song by American singer-songwriter Bob Dylan, featured on his 1967 album, John Wesley Harding. This song falls under the folk rock genre. Known for its conversation between a joker and a thief, it's often interpreted as a quest for freedom and a critique of societal norms.",
        "Classic hip-hop track with smooth beats, rhythmic vocals, and a laid-back vibe, showcasing West Coast rap's distinct style.",
        "EDM hit with a global appeal, repetitive beats, uplifting melody, and fusion of Indian and Western sounds.",
        "Heartfelt ballad exploring themes of regret and longing, with emotional lyrics and soulful delivery.",
        "Genre-blending hit combining country elements with trap beats, sparking debates about genre boundaries and authenticity.",
        "Instantly recognizable piano composition, delicate yet spirited melody, a favorite among classical music enthusiasts.",
        "Witty and controversial lyrics in a satirical take on celebrity culture and self-identity, showcasing rap's storytelling power.",
        "Collaboration blending electronic dance music with pop vocals, emotional undertones, and infectious beat.",
        "Folk-rock classic contrasting sunny lyrics with a melancholic melody, reflecting longing for warmer days and pursuit of dreams."
    ],
    "clicks": [10, 20, 30, 20, 10, 40, 30, 50, 60, 50 ],
    "ratings": [4.0, 3.5, 4.5, 4.0, 3.0,4.0, 3.5, 4.5, 4.0, 3.0],
    "likes": [100, 200, 300, 400, 200, 100, 200, 300, 400, 200],
    "orders": [10, 20, 15, 13, 7, 12, 30, 3, 50, 10],
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

def update_interactions(clicks, ratings, likes, orders, song_id):
    # Properly update interaction metrics for a specific book
    indices = df_books.index[df_books['song_id'] == song_id]
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

def recommend_books(song_id):
    # Convert features_matrix to csr for efficient calculations if not already
    features_csr = features_matrix.tocsr()

    # Find the index of the book
    song_idx = df_books.index[df_books['song_id'] == song_id][0]

    # Calculate cosine similarity for the specified book against all others
    cosine_sim = cosine_similarity(features_csr[song_idx], features_csr).flatten()
    # Find the indices of the books with the highest similarity scores, excluding the book itself
    recommended_indices = cosine_sim.argsort()[-4:][::-1]
    recommended_indices = recommended_indices[recommended_indices != song_idx]  # Exclude itself
    recommended_books = df_books.iloc[recommended_indices]['title'].tolist()

    return recommended_books


def predictor(clicks, ratings, likes, orders, user_id, song_id):
    update_interactions(clicks, ratings, likes, orders, song_id)
    something = recommend_books(song_id)
    return something


# Example usage
# update_interactions(5, 4.7, 150, 25, 3)  # Simulate updating book with ID 3
# print(recommend_books(3))  # Recommend books similar to book ID 3
