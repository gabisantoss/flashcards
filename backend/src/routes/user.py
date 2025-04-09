import jwt
from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from ..infrastructure.repositories.user import UserRepository
from .schemas import UserCreateSchema, UserResponseSchema
from ..domain.models import FlashcardStatus
from .base import BaseRouter


class UserRouter(BaseRouter):
    def __init__(self):
        repository = UserRepository()
        create_schema = UserCreateSchema()
        response_schema = UserResponseSchema()
        many_response_schema = UserResponseSchema(many=True)
        super().__init__(repository, create_schema, response_schema, many_response_schema)

    def get(self):
        verify_jwt_in_request(optional=True)
        try:
            user_id = get_jwt_identity() or None
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired."}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token."}), 401
        except Exception as e:
            return jsonify({"message": "Error verifying token.", "error": str(e)}), 400
        if user_id:
            return self.repository.get_by_id(user_id)
        else:
            return super().get()

    def patch(self, user_id, flashcard_id):
        json_data = request.get_json()

        if not json_data:
            return jsonify({"message": "Missing body data."}), 400

        status = json_data.get("status")

        print([s.value for s in FlashcardStatus])

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
