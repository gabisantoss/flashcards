from flask import jsonify, request
from flask.views import MethodView

from marshmallow import ValidationError

from ..infrastructure.repositories.flashcard import FlashcardRepository
from ..routes.schemas import FlashcardCreateSchema, FlashcardResponseSchema


class FlashcardRouter(MethodView):
    def __init__(self):
        self.repository = FlashcardRepository()
        self.create_schema = FlashcardCreateSchema()
        self.response_schema = FlashcardResponseSchema()
        self.many_response_schema = FlashcardResponseSchema(many=True)

    def get(self):
        return self.many_response_schema.jsonify(self.repository.get_all())

    def post(self):
        json_data = request.get_json()
        if not json_data:
            return jsonify({"message": "Missing flashcard body data."}), 400

        try:
            flashcard_data = self.create_schema.load(json_data)
            flashcard = self.repository.add(**flashcard_data)
        except ValidationError as err:
            return jsonify(err.messages), 400
        except Exception as e:
            return jsonify({"message": f"Invalid data: {e}"}), 400

        return self.response_schema.jsonify(flashcard), 201
