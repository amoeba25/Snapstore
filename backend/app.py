from flask import Flask
from flask_cors import CORS
from src.sample import routes as routes

app = Flask(__name__)
CORS(app)

app.add_url_rule("/", view_func=routes.index)

if __name__ == '__main__':
    app.run(debug=True)