import os

from dotenv import load_dotenv


from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from .routes.flashcard import FlashcardRouter
from .routes.user import UserRouter
from .routes.login import LoginRouter

from .infrastructure.db import Base, engine

from .utils.extensions import ma, jwt_secret_key


load_dotenv()

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = jwt_secret_key
app.config["JWT_VERIFY_SUB"] = False
jwt = JWTManager(app)

ma.init_app(app)

origins = os.getenv("CORS_ORIGINS", "").split(",")
CORS(app, origins=origins)

Base.metadata.create_all(bind=engine)

flashcard_view = FlashcardRouter.as_view('flashcard_api')
app.add_url_rule(
    '/flashcards/', view_func=flashcard_view, methods=['GET'])
app.add_url_rule('/flashcards/', view_func=flashcard_view, methods=['POST'])

user_view = UserRouter.as_view('user_api')
app.add_url_rule(
    '/users/', view_func=user_view, methods=['GET'])
app.add_url_rule('/users/flashcards/<int:flashcard_id>',
                 view_func=user_view, methods=['PATCH'])

login_view = LoginRouter.as_view('login_api')
app.add_url_rule('/login/', view_func=login_view, methods=['POST'])

if __name__ == "__main__":
    app.run(debug=True)
