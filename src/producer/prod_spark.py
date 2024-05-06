from pyspark.sql import SparkSession
from pyspark.sql.functions import expr, col
import json
import ijson
import time
from kafka import KafkaProducer

# Initialize SparkSession
spark = (
    SparkSession.builder.appName("KafkaProducerExample")
    .master("local[*]")
    .config("spark.jars.packages", "org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.1")
    .getOrCreate()
)


def send_to_kafka(row):
    # print("sfs", row.value.encode())
    producer = KafkaProducer(bootstrap_servers="localhost:9092")
    producer.send("user_interactions", value=row.value.encode())
    producer.flush()
    time.sleep(1)




def publish_messages(messages):
    print(messages)
    df = spark.createDataFrame(messages)

    # Selecting and casting the data as string in JSON format
    df = df.select(expr("to_json(struct(*)) AS value"))

    # Apply the function to each row
    df.foreach(send_to_kafka)


# Open the large JSON file
filename = "interactions.json"
batch_size = 5  # Define number of JSON objects per batch
batch = []  # Initialize batch

with open(filename, "rb") as file:
    # Load and parse the JSON file in chunks
    objects = ijson.items(file, "item")  # Adjust 'item' based on your JSON path
    for obj in objects:
        batch.append(obj)
        if len(batch) >= batch_size:
            publish_messages(batch)
            batch = []  # Reset batch

if batch:
    publish_messages(batch)


# Stop the Spark session
spark.stop()
