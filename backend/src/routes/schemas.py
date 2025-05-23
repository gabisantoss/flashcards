from marshmallow import fields, validate
from marshmallow_enum import EnumField
from ..utils.extensions import ma

from ..domain.models import FlashcardStatus


class FlashcardCreateSchema(ma.Schema):
    question = fields.String(required=True)
    answer = fields.String(required=True)


class FlashcardResponseSchema(ma.Schema):
    id = fields.Integer()
    question = fields.String()
    answer = fields.String()


class UserFlashcardResponseSchema(FlashcardResponseSchema):
    status = EnumField(FlashcardStatus, by_value=True)


class UserCreateSchema(ma.Schema):
    email = fields.Email(required=True)
    password = fields.String(
        required=True, validate=validate.Length(min=6))
    username = fields.String(required=True, validate=validate.Length(min=3))


class UserResponseSchema(ma.Schema):
    id = fields.Integer()
    username = fields.String()
    email = fields.String()
    flashcards = fields.Nested(
        UserFlashcardResponseSchema, many=True, attribute="flashcards")
