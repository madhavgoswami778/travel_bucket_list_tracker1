from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Use URI from .env
MONGO_URI = os.environ.get("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["Travel_Bucket_List_Tracker"]
collection = db["destinations"]

def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc

@app.route("/destinations", methods=["GET"])
def get_destinations():
    destinations = list(collection.find())
    return jsonify([serialize(d) for d in destinations])

@app.route("/add", methods=["POST"])
def add_destination():
    data = request.json
    if "name" not in data:
        return jsonify({"error": "Missing destination name"}), 400
    data["status"] = data.get("status", "Wishlist")
    result = collection.insert_one(data)
    return jsonify({"success": True, "id": str(result.inserted_id)})

@app.route("/toggle/<id>", methods=["PATCH"])
def toggle_status(id):
    dest = collection.find_one({"_id": ObjectId(id)})
    if not dest:
        return jsonify({"error": "Not found"}), 404
    new_status = "Visited" if dest["status"] == "Wishlist" else "Wishlist"
    collection.update_one({"_id": ObjectId(id)}, {"$set": {"status": new_status}})
    return jsonify({"success": True})

@app.route("/weather/<city>", methods=["GET"])
def get_weather(city):
    API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    res = requests.get(url)
    return jsonify(res.json())

@app.route("/")
def index():
    return "✅ Travel Tracker API is running!"


if __name__ == "__main__":
    app.run(debug=True)
