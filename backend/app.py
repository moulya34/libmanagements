from bson.objectid import ObjectId
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/libraryDB"
mongo = PyMongo(app)
CORS(app)

# Routes for managing books
@app.route('/books', methods=['GET'])
def get_books():
    books = mongo.db.books.find()
    result = []
    for book in books:
        result.append({'_id': str(book['_id']), 'title': book['title'], 'author': book['author']})
    return jsonify(result)

@app.route('/books/<id>', methods=['GET'])
def get_book(id):
    book = mongo.db.books.find_one({'_id': ObjectId(id)})
    if book:
        return jsonify({'_id': str(book['_id']), 'title': book['title'], 'author': book['author']})
    return jsonify({'error': 'Book not found'}), 404

@app.route('/books', methods=['POST'])
def add_book():
    data = request.json
    print(f"Received data: {data}")
    book_id = mongo.db.books.insert_one(data).inserted_id
    return jsonify({'_id': str(book_id)}), 201

@app.route('/books/<id>', methods=['PUT'])
def update_book(id):
    data = request.json
    print(f"Updating book with ID: {id}, Data: {data}")
    result = mongo.db.books.update_one({'_id': ObjectId(id)}, {'$set': data})
    if result.matched_count == 0:
        return jsonify({'error': 'Book not found'}), 404
    return jsonify({'msg': 'Book updated'}), 200

@app.route('/books/<id>', methods=['DELETE'])
def delete_book(id):
    print(f"Deleting book with ID: {id}")
    result = mongo.db.books.delete_one({'_id': ObjectId(id)})
    if result.deleted_count == 0:
        return jsonify({'error': 'Book not found'}), 404
    return jsonify({'msg': 'Book deleted'}), 200

# Routes for existing services
@app.route('/services', methods=['GET'])
def get_services():
    services = list(mongo.db.services.find({}, {'_id': 0}))
    return jsonify(services)

@app.route('/contacts', methods=['GET'])
def get_contacts():
    try:
        contacts = mongo.db.services.find_one({'service': 'Contact Details'}, {'_id': 0, 'details': 1})
        if contacts:
            return jsonify(contacts['details'])
        else:
            return jsonify({"error": "No contact details found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/announcements', methods=['GET'])
def get_announcements():
    try:
        announcements = mongo.db.services.find_one({'service': 'Updates and Announcements'}, {'_id': 0, 'details': 1})
        if announcements:
            return jsonify(announcements['details'])
        else:
            return jsonify({"error": "No announcements found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/hours', methods=['GET'])
def get_hours():
    try:
        hours = mongo.db.services.find_one({'service': 'Hours of Operation'}, {'_id': 0, 'details': 1})
        if hours:
            return jsonify(hours['details'])
        else:
            return jsonify({"error": "No hours of operation found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/feedback', methods=['POST'])
def add_feedback():
    feedback = request.json
    mongo.db.feedback.insert_one(feedback)
    return jsonify({"message": "Feedback received"}), 200

if __name__ == '__main__':
    app.run(debug=True)