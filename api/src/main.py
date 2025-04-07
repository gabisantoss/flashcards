import os

from dotenv import load_dotenv

from flask import Flask
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)

origins = os.getenv("CORS_ORIGINS", "").split(",")

CORS(app, origins=origins)

if __name__ == "__main__":
    app.run(debug=True)
