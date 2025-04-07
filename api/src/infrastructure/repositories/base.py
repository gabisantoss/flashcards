from sqlalchemy.orm import Session
from infrastructure.db import SessionLocal


class BaseRepository:
    def __init__(self, model):
        self.db: Session = SessionLocal()
        self.model = model

    def get_all(self):
        return self.db.query(self.model).all()

    def get_by_id(self, record_id: int):
        return self.db.query(self.model).filter_by(id=record_id).first()

    def add(self, **kwargs):
        record = self.model(**kwargs)
        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)
        return record

    def update(self, record):
        self.db.commit()
        self.db.refresh(record)
        return record
