from infrastructure.models import User
from infrastructure.models import UserFlashcard
from infrastructure.repositories.base import BaseRepository


class UserRepository(BaseRepository):
    def __init__(self):
        super().__init__(User)

    def get_by_email(self, email):
        return self.db.query(User).filter_by(email=email).first()

    def update_user_flashcard(self, status, user_id, flashcard_id):
        user_flashcard = self.db.query(UserFlashcard).filter_by(
            user_id=user_id, flashcard_id=flashcard_id).first()

        if user_flashcard:
            user_flashcard.status = status
            self.db.commit()

        return user_flashcard
