import pytest

from datetime import timedelta

from flask_jwt_extended import create_access_token

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.infrastructure.db import Base

from src.app_factory import create_app
from src.infrastructure.models import User, Flashcard
from src.infrastructure.repositories.user import UserRepository
from src.infrastructure.repositories.flashcard import FlashcardRepository

SQLALCHEMY_TEST_URL = "sqlite:///:memory:"


@pytest.fixture(autouse=True)
def clean_db(db_session):
    """Automatically clean the DB before each test."""
    for table in reversed(Base.metadata.sorted_tables):
        db_session.execute(table.delete())
    db_session.commit()


@pytest.fixture(scope="session")
def engine():
    """Creates a SQLite in-memory engine to be shared across the entire test session."""
    return create_engine(SQLALCHEMY_TEST_URL, connect_args={
        "check_same_thread": False})


@pytest.fixture(scope="session")
def tables(engine):
    """
    Sets up and tears down the database schema once per test session.

    This ensures that all tables exist before tests begin. While this fixture is not
    directly used in other fixtures, it is injected into them to enforce ordering
    and guarantee schema setup.
    """
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db_session(engine, tables):
    """
    Provides a new SQLAlchemy session for each test function.

    The 'tables' fixture is included as a dependency to ensure the database schema
    is created before this session starts, even though it is not directly used.
    """
    Session = sessionmaker(bind=engine)
    session = Session()
    yield session
    session.close()


@pytest.fixture
def app(db_session):
    """
    Creates and configures a Flask test application instance.

    It injects test-specific repository factories that share the same SQLAlchemy session,
    allowing consistent state across service and route layers during testing.
    """
    def test_user_repository_factory():
        return UserRepository(db_session)

    def test_flashcard_repository_factory():
        return FlashcardRepository(db_session)

    app = create_app(user_repo_factory=test_user_repository_factory,
                     flashcard_repo_factory=test_flashcard_repository_factory,
                     db_url=SQLALCHEMY_TEST_URL)

    app.config.update({
        "TESTING": True,
        "JWT_SECRET_KEY": "test",
    })

    yield app


@pytest.fixture
def client(app):
    """Provides a Flask test client instance using the configured test app."""
    return app.test_client()


@pytest.fixture
def sample_flashcard(db_session):
    """
    Creates and persists a sample flashcard.
    """
    flashcard = Flashcard(question="What is AI?",
                          answer="Artificial Intelligence")
    db_session.add(flashcard)
    db_session.commit()
    return flashcard


@pytest.fixture
def sample_user(db_session):
    """
    Adds a sample user to the test database.

    Useful for tests that require a valid authenticated user or need to validate
    user-related logic.
    """
    user = User(username="testuser", password="hashedpassword",
                email="test@example.com")
    db_session.add(user)
    db_session.commit()
    return user


@pytest.fixture
def access_token(client, sample_user):
    """
    Generates a valid JWT access token for a sample user.
    """
    with client.application.app_context():
        return create_access_token(identity=sample_user.id)


@pytest.fixture
def expired_token(client, sample_user):
    """
    Generates an expired JWT token for testing expiration behavior.
    """
    with client.application.app_context():
        return create_access_token(identity=sample_user.id, expires_delta=timedelta(seconds=-1))
