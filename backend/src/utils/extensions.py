import os
from flask_marshmallow import Marshmallow

ma = Marshmallow()
jwt_secret_key = os.getenv('JWT_SECRET_KEY')
