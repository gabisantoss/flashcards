import jwt

from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask.views import MethodView

from ..infrastructure.repositories.user import UserRepository
from .schemas import UserCreateSchema, UserResponseSchema
from ..domain.models import FlashcardStatus


class UserRouter(MethodView):
    decorators = [jwt_required(optional=True)]

    def __init__(self):
        self.repository = UserRepository()
        self.create_schema = UserCreateSchema()
        self.response_schema = UserResponseSchema()
        self.many_response_schema = UserResponseSchema(many=True)

    def _get_item(self, user_id: str):
        user = self.repository.get_by_id(user_id)
        if not user:
            return jsonify({"message": "User not found."}), 404
        return self.response_schema.jsonify(user)

    def get(self):
        try:
            user_id = get_jwt_identity() or None
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired."}), 401
        except jwt.InvalidTokenError:
            print("Erro 2")
            return jsonify({"message": "Invalid token."}), 401
        except Exception as e:
            return jsonify({"message": "Error verifying token.", "error": str(e)}), 400
        if user_id:
            return self._get_item(user_id)
        return self.many_response_schema.jsonify(self.repository.get_all())

    def patch(self, flashcard_id):
        try:
            user_id = get_jwt_identity() or None
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired."}), 401
        except jwt.InvalidTokenError:
            print("Erro 2")
            return jsonify({"message": "Invalid token."}), 401
        except Exception as e:
            return jsonify({"message": "Error verifying token.", "error": str(e)}), 400
        if user_id:
            json_data = request.get_json()

            if not json_data:
                return jsonify({"message": "Missing body data."}), 400

            status = json_data.get("status")

            if status not in [s.value for s in FlashcardStatus]:
                return jsonify({"message": "Status inválido."}), 400

            user_flashcard = self.repository.update_user_flashcard(
                status=status,
                user_id=user_id,
                flashcard_id=flashcard_id
            )

            if not user_flashcard:
                return jsonify({"message": "User flashcard not found."}), 404

            return '', 204
