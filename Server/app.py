from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
from flask_cors import CORS
import base64
import json
import os

app = Flask(__name__)
CORS(app)

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client["User"]
quiz_collection = db["QuizQuestion"]

@app.route('/get_questions', methods=['GET'])
def get_questions():
    questions_cursor = quiz_collection.find({})
    questions = []

    for question in questions_cursor:
        question_data = {
            "_id": str(question["_id"]),
            "questionText": question["questionText"],
            "options": []
        }

        for option in question["options"]:
            if "image" in option:
                image_base64 = base64.b64encode(option["image"]).decode("utf-8")
                option_data = {
                    "text": option["text"],
                    "image_base64": image_base64
                }
            else:
                option_data = {"text": option["text"]}
            question_data["options"].append(option_data)

        questions.append(question_data)

    return jsonify(questions)

@app.route('/submit_answers', methods=['POST'])
def submit_answers():
    submitted_answers = request.json['answers']
    score = 0

    for answer in submitted_answers:
        question_id = answer['question_id']
        selected_option_index = answer['selected_option_index']  # Note the change to using an index

        question = quiz_collection.find_one({"_id": ObjectId(question_id)})
        if question:
            # Verify the selected option index is the correct one
            if 'correctOptionId' in question and question['correctOptionId'] == selected_option_index:
                score += 1

    return jsonify({'score': score})


if __name__ == '__main__':
    app.run(debug=True)
