from flask.views import MethodView
from flask import request, jsonify, abort
from marshmallow import ValidationError


class BaseRouter(MethodView):
    def __init__(self, repository, create_schema, response_schema, many_response_schema):
        self.repository = repository
        self.create_schema = create_schema
        self.response_schema = response_schema
        self.many_response_schema = many_response_schema

    def get(self, record_id=None):
        if record_id is not None:
            return self._get_item(record_id)
        else:
            return self.many_response_schema.jsonify(self.repository.get_all())

    def _get_item(self, record_id):
        record = self.repository.get_by_id(record_id)
        if not record:
            abort(404, description="Resource not found")
        return self.response_schema.jsonify(record)

    def post(self):
        json_data = request.get_json()
        if not json_data:
            abort(400, description="Missing JSON data")

        try:
            data = self.create_schema.load(json_data)
        except ValidationError as err:
            return jsonify(err.messages), 400

        try:
            record = self.repository.add(**data)
        except Exception as e:
            abort(400, description=f"Invalid data: {e}")

        return self.response_schema.jsonify(record), 201
