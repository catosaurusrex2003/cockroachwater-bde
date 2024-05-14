from flask import Flask, request, jsonify
from pyspark.sql import SparkSession
from pyspark.sql.functions import expr
import time
from kafka import KafkaProducer
from pyspark.sql.types import StructType, StructField, IntegerType, StringType
from flask_cors import CORS
from model.dbConnect import recomCollection
import json


app = Flask(__name__)
CORS(app)

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


@app.route("/produce_spark", methods=["POST"])
def produce_spark():
    print("request came")
    # Extract JSON data from request
    json_data = request.get_json()
    if not json_data:
        return jsonify({"error": "No data provided"}), 400

    print(json_data)
    # print(json_data[0]["user_id"])
    # print(type(json_data[0]["user_id"]))

    # Specify the file path
    file_path = "new_interactions.json"

    # Writing data to a JSON file
    with open(file_path, "w") as file:
        json.dump(json_data, file, indent=4)

    def send_to_kafka(row):
        producer = KafkaProducer(bootstrap_servers="localhost:9092")
        producer.send("user_interactions", value=row.value.encode())
        producer.flush()
        time.sleep(1)

    def publish_messages(messages):
        df = spark.createDataFrame(messages, schema)
        df = df.select(expr("to_json(struct(*)) AS value"))
        df.foreach(send_to_kafka)
        print(f"publishing to kafka | {messages}")

    publish_messages(json_data)

    return jsonify({"message": "Messages produced to Kafka"}), 200


@app.route("/get_user_recom", methods=["POST"])
def get_user():
    # Extract user_id from request JSON
    data = request.get_json()
    if not data or "user_id" not in data:
        return jsonify({"error": "Missing user_id in request"}), 400

    user_id = data["user_id"]

    # Retrieve the document from MongoDB
    try:

        document = recomCollection.find_one({"user_id": user_id})
        if document:
            # Remove the MongoDB '_id' field from the response
            document.pop("_id", None)
            return jsonify(document), 200
        else:
            return jsonify({"user_not_found": "true"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("A")
    spark = (
        SparkSession.builder.appName("KafkaProducerExample")
        .master("local[*]")
        .config(
            "spark.jars.packages", "org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.1"
        )
        .getOrCreate()
    )
    print("B")
    app.run(debug=True, port=8000)
    spark.stop()
