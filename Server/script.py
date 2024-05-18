import os
import random
import bson
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB URI from your environment variables
MONGODB_URI = os.getenv("MONGODB_URI")

# Establish MongoDB connection
client = MongoClient(MONGODB_URI)
db = client["User"]  # Accessing the "User" database
quiz_collection = db["QuizQuestion"]

# Define the options and their respective image paths
options_info = [
    {"text": "No Left Turn", "image_path": "resources/images/noLeftTurn.png"},
    {"text": "No Overtaking", "image_path": "resources/images/noovertaking.png"},
    {"text": "Uneven Road", "image_path": "resources/images/unEvenRoad.png"},
    {"text": "No Right Turn", "image_path": "resources/images/noRightTurn.png"},
    {"text": "No U-Turn", "image_path": "resources/images/noU-turn.png"},
    # Add more options as needed
]

# Function to read image from file
def read_image_file(file_path):
    with open(file_path, 'rb') as file:
        return file.read()

# Initialize a set to keep track of generated questions
generated_questions = set()

def generate_question_and_options(available_options):
    question_templates = [
        "Which sign means '{}'",
        "Identify the '{}' sign.",
        "Which sign indicates that '{}' is allowed?",
        "Identify the road sign for '{}'",
        "Select the sign that indicates '{}'",
    ]

    # Attempt to generate a unique question
    for _ in range(100):  # Try up to 100 times to find a unique question
        question_template = random.choice(question_templates)
        correct_option_info = random.choice(available_options)
        question_text = question_template.format(correct_option_info["text"])

        # Check if this question was already generated
        if question_text not in generated_questions:
            generated_questions.add(question_text)  # Mark as generated
            break
    else:
        raise ValueError("Failed to generate a unique question after many attempts.")

    # Prepare options
    options = []
    for option_info in available_options:
        options.append({
            "text": option_info["text"],
            "image": bson.Binary(read_image_file(option_info["image_path"])),
            "imageContentType": "image/png"
        })

    # Randomly shuffle options
    random.shuffle(options)

    # Find the index of the correct option
    correct_option_index = next((i for i, option in enumerate(options) if option["text"] == correct_option_info["text"]), None)

    return {
        "questionText": question_text,
        "options": options,
        "correctOptionId": correct_option_index  # Assumes correctOptionId is the index. Adjust if needed.
    }

def insert_questions_into_db(n):
    for _ in range(n):
        question_data = generate_question_and_options(options_info)
        quiz_collection.insert_one(question_data)
        print(f"Inserted question: {question_data['questionText']}")

# Example: Insert 15 random questions into the database
insert_questions_into_db(15)
