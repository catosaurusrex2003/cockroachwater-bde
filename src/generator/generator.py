import json
import random

def generate_random_data(num_entries):
    data = []
    for _ in range(num_entries):
        entry = {
            "user_id": random.randint(1, 10),
            "song_id": random.randint(1, 10),
            "clicks": random.randint(1, 100),
            "ratings": random.randint(1, 100),
            "likes": random.randint(1, 100),
            "orders": random.randint(1, 100)
        }
        data.append(entry)
    return data

# Number of entries you want to generate
num_entries = 1000000  # Change this number based on how many entries you want

# Generate the random JSON data
random_json_data = generate_random_data(num_entries)

# Saving to a file
with open('random_data.json', 'w') as f:
    json.dump(random_json_data, f, indent=4)

print("Data saved to 'random_data.json'.")
