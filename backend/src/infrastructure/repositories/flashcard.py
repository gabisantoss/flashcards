from sqlalchemy.orm import Session

from ..models import Flashcard
from ..models import UserFlashcard


class FlashcardRepository:
    def __init__(self, db_session):
        self.db = db_session

    def get_all(self):
        return self.db.query(Flashcard).all()

    def get_by_id(self, flashcard_id: int):
        return self.db.query(Flashcard).filter_by(id=flashcard_id).first()

    def add(self, question: str, answer: str):
        record = Flashcard(question=question, answer=answer)
        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)
        return record
