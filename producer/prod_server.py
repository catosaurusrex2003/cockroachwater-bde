from flask import Flask, request, jsonify
from pyspark.sql import SparkSession
from pyspark.sql.functions import expr
import time
from kafka import KafkaProducer

app = Flask(__name__)

@app.route('/produce_spark', methods=['POST'])
def produce_spark():
    # Extract JSON data from request
    json_data = request.get_json()
    if not json_data:
        return jsonify({"error": "No data provided"}), 400


    def send_to_kafka(row):
        producer = KafkaProducer(bootstrap_servers="localhost:9092")
        producer.send("user_interactions", value=row.value.encode())
        producer.flush()
        time.sleep(1)

    def publish_messages(messages):
        df = spark.createDataFrame(messages)
        df = df.select(expr("to_json(struct(*)) AS value"))
        df.foreach(send_to_kafka)
        print(f"publishing to kafka | {messages}")

    publish_messages(json_data)

    return jsonify({"message": "Messages produced to Kafka"}), 200


if __name__ == '__main__':
    print("A")
    spark = (
        SparkSession.builder.appName("KafkaProducerExample")
        .master("local[*]")
        .config("spark.jars.packages", "org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.1")
        .getOrCreate()
    )
    print("B")
    app.run(debug=True)
    spark.stop()
