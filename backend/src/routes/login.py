from flask.views import MethodView
from flask import request, jsonify, abort
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token

from ..infrastructure.repositories.user import UserRepository


class LoginRouter(MethodView):
    def __init__(self, user_repository_factory):
        self.repository = user_repository_factory()

    def post(self):
        data = request.get_json()
        if not data or "email" not in data or "password" not in data:
            abort(400, description="Email and password required.")

        user = self.repository.get_by_email(data["email"])
        if not user or not check_password_hash(user.password, data["password"]):
            abort(401, description="Invalid credentials.")

        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)
