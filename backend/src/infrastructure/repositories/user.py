from sqlalchemy.orm import aliased
from sqlalchemy import func

from werkzeug.security import generate_password_hash

from ..models import User, Flashcard
from ..models import UserFlashcard


class UserRepository:
    def __init__(self, db_session):
        self.db = db_session

    def get_all(self):
        return self.db.query(User).all()

    def get_by_id(self, user_id: int):
        db_user = self.db.query(User).filter_by(id=user_id).first()

        if db_user is None:
            return None

        user_flashcard_alias = aliased(UserFlashcard)

        flashcards_with_status = self.db.query(
            Flashcard.id,
            Flashcard.question,
            Flashcard.answer,
            func.coalesce(user_flashcard_alias.status,
                          "TO_STUDY").label('status')
        ).outerjoin(
            user_flashcard_alias,
            (user_flashcard_alias.flashcard_id == Flashcard.id) &
            (user_flashcard_alias.user_id == user_id)
        ).all()

        user = db_user.to_dict()

        user_flashcards = []

        for flashcard in flashcards_with_status:
            user_flashcards.append(flashcard._asdict())

        user['flashcards'] = user_flashcards

        return user

    def add(self, username: str, password: str, email: str):
        password_hash = generate_password_hash(password)
        record = User(username=username, password=password_hash, email=email)
        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)
        return record

    def get_by_email(self, email):
        return self.db.query(User).filter_by(email=email).first()

    def update_user_flashcard(self, status, user_id, flashcard_id):
        user_flashcard = self.db.query(UserFlashcard).filter_by(
            user_id=user_id, flashcard_id=flashcard_id).first()

        if user_flashcard:
            user_flashcard.status = status
            self.db.commit()
        else:
            user_flashcard = UserFlashcard(
                user_id=user_id, flashcard_id=flashcard_id, status=status)
            self.db.add(user_flashcard)
            self.db.commit()
            self.db.refresh(user_flashcard)

        return user_flashcard
