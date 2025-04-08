from ..infrastructure.repositories.flashcard import FlashcardRepository
from ..routes.base import BaseRouter
from ..routes.schemas import FlashcardCreateSchema, FlashcardResponseSchema


class FlashcardRouter(BaseRouter):
    def __init__(self):
        repository = FlashcardRepository()
        create_schema = FlashcardCreateSchema()
        response_schema = FlashcardResponseSchema()
        many_response_schema = FlashcardResponseSchema(many=True)
        super().__init__(repository, create_schema, response_schema, many_response_schema)
