import os

from dotenv import load_dotenv

from extensions import ma

from flask import Flask
from flask_cors import CORS

from infrastructure.db import Base, engine

load_dotenv()

app = Flask(__name__)

ma.init_app(app)

origins = os.getenv("CORS_ORIGINS", "").split(",")
CORS(app, origins=origins)

Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    app.run(debug=True)
