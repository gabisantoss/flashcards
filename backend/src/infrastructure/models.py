from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship

from ..domain.models import FlashcardStatus
from .db import Base


class Flashcard(Base):
    __tablename__ = 'flashcards'

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String, index=True)
    answer = Column(String)

    def to_dict(self):
        return {
            "id": self.id,
            "question": self.question,
            "answer": self.answer
        }


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    email = Column(String, unique=True, index=True)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
        }


class UserFlashcard(Base):
    __tablename__ = 'user_flashcards'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    flashcard_id = Column(Integer, ForeignKey('flashcards.id'))
    status = Column(Enum(FlashcardStatus), default=FlashcardStatus.TO_STUDY)

    user = relationship("User")
    flashcard = relationship("Flashcard")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "flashcard_id": self.flashcard_id,
            "status": self.status.name
        }
