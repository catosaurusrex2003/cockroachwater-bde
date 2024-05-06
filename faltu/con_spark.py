from pyspark.sql import SparkSession
from pyspark.sql.functions import col, expr, from_json
from pyspark.sql.types import StructType, StructField, StringType, IntegerType
from Recommender import predictor

spark = (
    SparkSession.builder.appName("KafkaConsumerExample")
    .master("local[*]")
    .config("spark.jars.packages", "org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.1")
    .getOrCreate()
)

schema = StructType(
    [
        StructField("user_id", IntegerType()),
        StructField("book_id", IntegerType()),
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

agg_df = df.groupBy("book_id").agg(
    {"clicks": "sum", "ratings": "avg", "likes": "sum", "orders": "sum"}
)


def process_batch(df, epoch_id):
    print(f"Processing batch {epoch_id}")

    # Check if the DataFrame is empty
    if not df.rdd.isEmpty():
        # Example transformation
        # df = df.withColumn("new_metric", df.clicks * 10 + df.ratings)
        # df = df.filter(df.ratings >= 3)
        # df = df.groupBy("book_id").agg({"ratings": "avg", "clicks": "sum"})

        # Output the processed data
        df.show()

        clicks = (df["clicks"],)
        ratings = (df["ratings"],)
        likes = (df["likes"],)
        orders = (df["orders"],)
        user_id = (df["user_id"],)
        book_id = (df["book_id"],)

        recommended_books = predictor(
            clicks,
            ratings,
            likes,
            orders,
            user_id,
            book_id,
        )

        print(f"Recommended books for user {user_id}: {recommended_books}")


query = df.writeStream.foreachBatch(process_batch).start()


query.awaitTermination()
