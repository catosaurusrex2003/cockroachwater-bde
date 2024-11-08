from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import find_dotenv, load_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)
MONGOURI = os.getenv("MONGOURI")

# Create a new client and connect to the server
client = MongoClient(MONGOURI, server_api=ServerApi("1"))


# Send a ping to confirm a successful connection
try:
    client.admin.command("ping")
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

songCollection = client.bde.songrecom

