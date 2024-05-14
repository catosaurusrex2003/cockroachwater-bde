import json
from kafka import KafkaConsumer
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
from scipy.sparse import hstack

from Recommender import predictor


# Set up Kafka consumer
consumer = KafkaConsumer(
    "user_interactions",
    bootstrap_servers=["localhost:9092"],
    auto_offset_reset="latest",
    value_deserializer=lambda m: json.loads(m.decode("utf-8")),
)

for message in consumer:
    interaction = message.value
    # print(f"Received interaction: {interaction}")

    # Update interaction data
    song_id = interaction["song_id"]
    user_id = interaction[
        "user_id"
    ]  # Assuming each message contains user_id and song_id
    clicks = interaction["clicks"]
    ratings = interaction["ratings"]
    likes = interaction["likes"]
    orders = interaction["orders"]

    # Get recommendations
    recommended_books = predictor(clicks, ratings, likes, orders, user_id, song_id)

    print(f"Recommended books for user {user_id}: {recommended_books}")
