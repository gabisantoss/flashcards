import os

from sqlalchemy import create_engine

from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from src.routes.flashcard import FlashcardRouter
from src.routes.user import UserRouter
from src.routes.login import LoginRouter

from src.infrastructure.db import setup_engine_and_session, Base
from src.infrastructure.repositories.user import UserRepository
from src.infrastructure.repositories.flashcard import FlashcardRepository

from src.utils.extensions import ma, jwt_secret_key


def create_app(user_repo_factory=None, flashcard_repo_factory=None, db_url=None):
    app = Flask(__name__)
    app.config["JWT_SECRET_KEY"] = jwt_secret_key
    app.config["JWT_VERIFY_SUB"] = False
    app.config["SQLALCHEMY_DATABASE_URL"] = db_url

    engine, SessionLocal = setup_engine_and_session(
        app.config["SQLALCHEMY_DATABASE_URL"])
    db_session = SessionLocal()

    Base.metadata.create_all(bind=engine)

    jwt = JWTManager(app)

    def invalid_token(_):
        return jsonify({"message": "Invalid token."}), 401

    def expired_token(*_):
        return jsonify({"message": "Token has expired."}), 401

    jwt.invalid_token_loader(invalid_token)
    jwt.expired_token_loader(expired_token)

    ma.init_app(app)

    origins = os.getenv("CORS_ORIGINS", "").split(",")
    CORS(app, origins=origins)

    flashcard_repo_factory = flashcard_repo_factory or (
        lambda: FlashcardRepository(db_session))
    flashcard_view = FlashcardRouter.as_view(
        'flashcard_api', flashcard_repository_factory=flashcard_repo_factory)
    app.add_url_rule(
        '/flashcards/', view_func=flashcard_view, methods=['GET'])
    app.add_url_rule('/flashcards/', view_func=flashcard_view,
                     methods=['POST'])

    user_repo_factory = user_repo_factory or (
        lambda: UserRepository(db_session))
    user_view = UserRouter.as_view(
        'user_api', user_repository_factory=user_repo_factory)
    app.add_url_rule(
        '/users/', view_func=user_view, methods=['GET', 'POST'])
    app.add_url_rule('/users/flashcards/<int:flashcard_id>',
                     view_func=user_view, methods=['PATCH'])

    login_view = LoginRouter.as_view(
        'login_api', user_repository_factory=user_repo_factory)
    app.add_url_rule('/login/', view_func=login_view, methods=['POST'])

    return app
