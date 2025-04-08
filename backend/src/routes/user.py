from flask import request, abort
from ..infrastructure.repositories.user import UserRepository
from .schemas import UserCreateSchema, UserResponseSchema
from ..domain.models import FlashcardStatus
from flask import request, abort
from .base import BaseRouter


class UserRouter(BaseRouter):
    def __init__(self):
        repository = UserRepository()
        create_schema = UserCreateSchema()
        response_schema = UserResponseSchema()
        many_response_schema = UserResponseSchema(many=True)
        super().__init__(repository, create_schema, response_schema, many_response_schema)

    def patch(self, user_id, flashcard_id):
        json_data = request.get_json()
        if not json_data:
            abort(400, description="Missing JSON data")

        status = json_data.get("status")

        print([s.value for s in FlashcardStatus])

        if status not in [s.value for s in FlashcardStatus]:
            abort(400, description="Invalid status")

        user_flashcard = self.repository.update_user_flashcard(
            status=status,
            user_id=user_id,
            flashcard_id=flashcard_id
        )

        if not user_flashcard:
            abort(404, description="User flashcard not found")

        return '', 204
