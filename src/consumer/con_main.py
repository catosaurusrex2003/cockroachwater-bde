from pyspark.sql import SparkSession
from pyspark.sql.functions import col, expr, from_json
from pyspark.sql.types import StructType, StructField, StringType, IntegerType
from Predictor import predictor
import pyspark
print(pyspark.__version__)
import py4j
print(py4j.__version__)

from model.dbConnect import songCollection


spark = (
    SparkSession.builder.appName("KafkaConsumerExample")
    .master("local[*]")
    .config("spark.jars.packages", "org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.1")
    .getOrCreate()
)

schema = StructType(
    [
        StructField("user_id", IntegerType()),
        StructField("song_id", IntegerType()),
        StructField("clicks", IntegerType()),
        StructField("ratings", IntegerType()),
        StructField("likes", IntegerType()),
        StructField("orders", IntegerType()),
    ]
)

df = (
    spark.readStream.format("kafka")
    .option("kafka.bootstrap.servers", "localhost:9092")
    .option("subscribe", "user_interactions")
    .load()
    .selectExpr("CAST(value AS STRING)")
)

df = df.select(from_json(col("value"), schema).alias("data")).select("data.*")

agg_df = df.groupBy("song_id").agg(
    {"clicks": "sum", "ratings": "avg", "likes": "sum", "orders": "sum"}
)


def process_batch(df, epoch_id):
    print(f"Processing batch {epoch_id}")

    # Check if the DataFrame is empty
    if not df.rdd.isEmpty():

        # Output the processed data
        df.show()
        collected_rows = df.collect()  # process each row of a batch
        print("HERE A")
        for row in collected_rows:
            clicks = row.clicks
            ratings = row.ratings
            likes = row.likes
            orders = row.orders
            user_id = row.user_id
            song_id = row.song_id
            print("HERE B")
            print(f"click {clicks}")
            print(f"ratings {ratings}")
            print(f"likes {likes}")
            print(f"orders {orders}")
            print(f"user_id {user_id}")
            print(f"song_id {song_id}")
            # Assuming 'predictor' is a function that takes these parameters and returns a list of recommended books
            recommended_books = predictor(
                clicks,
                ratings,
                likes,
                orders,
                user_id,
                song_id
            )

            document = {
                "user_id": user_id,
                "books": recommended_books
            }
            filter_condition = {"user_id": document["user_id"]}

            try:
                result = songCollection.update_one(filter_condition, {"$set": document}, upsert=True)
                print(f"Document inserted with _id: {result.inserted_id}")
            except Exception as e:
                print(f"An error occurred: {e}")

            # Log the recommended books
            print(f"Recommended books for user {user_id}: {recommended_books}")


query = df.writeStream.foreachBatch(process_batch).start()


query.awaitTermination()
