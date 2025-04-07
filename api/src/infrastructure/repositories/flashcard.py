from infrastructure.models import Flashcard
from infrastructure.models import UserFlashcard
from infrastructure.repositories.base import BaseRepository


class FlashcardRepository(BaseRepository):
    def __init__(self):
        super().__init__(Flashcard)

    def get_by_user_id(self, user_id: int):
        return self.db.query(UserFlashcard).filter_by(user_id=user_id).all()
