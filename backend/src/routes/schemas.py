from marshmallow import fields, validate
from extensions import ma

from domain.models import FlashcardStatus


class FlashcardCreateSchema(ma.Schema):
    question = fields.String(required=True)
    answer = fields.String(required=True)


class FlashcardResponseSchema(ma.Schema):
    id = fields.Integer()
    question = fields.String()
    answer = fields.String()


class UserFlashcardResponseSchema(ma.Schema):
    id = fields.Integer(attribute="flashcard.id")
    question = fields.String(attribute="flashcard.question")
    answer = fields.String(attribute="flashcard.answer")
    status = fields.String(validate=validate.OneOf(
        [s.value for s in FlashcardStatus]))


class UserFlashcardUpdateSchema(ma.Schema):
    flashcard_id = fields.Integer(required=True)
    status = fields.String(validate=validate.OneOf(
        [s.value for s in FlashcardStatus]), required=True)


class UserCreateSchema(ma.Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True, validate=validate.Length(min=6))
    username = fields.String(required=True, validate=validate.Length(min=3))


class UserResponseSchema(ma.Schema):
    id = fields.Integer()
    username = fields.String()
    email = fields.String()
    flashcards = fields.Nested(
        UserFlashcardResponseSchema, many=True, attribute="flashcards")
