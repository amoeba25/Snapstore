from flask import jsonify

def index():
    data = {
        "name": "xyz",
        "data": "This is my JSON response"
    }
    return jsonify(data)