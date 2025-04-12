from src.infrastructure.models import UserFlashcard, User


def test_get_all_users(client):
    client.post("/users/", json={
        "username": "user1",
        "password": "123456",
        "email": "u1@example.com"
    })
    client.post("/users/", json={
        "username": "user2",
        "password": "123456",
        "email": "u2@example.com"
    })

    response = client.get("/users/")
    assert response.status_code == 200
    users = response.get_json()
    assert isinstance(users, list)
    assert len(users) == 2


def test_get_user_with_token(client, access_token):
    response = client.get(
        "/users/", headers={"Authorization": f"Bearer {access_token}"})
    assert response.status_code == 200
    data = response.get_json()
    assert data["username"] == "testuser"


def test_get_user_with_expired_token(client, expired_token):
    response = client.get(
        "/users/", headers={"Authorization": f"Bearer {expired_token}"})
    assert response.status_code == 401
    assert response.get_json()["message"] == "Token has expired."


def test_get_user_with_invalid_token(client):
    response = client.get(
        "/users/", headers={"Authorization": "Bearer something.invalid"})
    assert response.status_code == 401
    assert response.get_json()["message"] == "Invalid token."


def test_post_create_user_success(client):
    response = client.post("/users/", json={
        "username": "unique_username",
        "password": "123456",
        "email": "user@example.com"
    })

    assert response.status_code == 201
    data = response.get_json()
    assert data["username"] == "unique_username"
    assert data["email"] == "user@example.com"


def test_post_create_user_missing_body(client):
    response = client.post("/users/", json={})
    assert response.status_code == 400
    assert response.get_json()["message"] == "Missing user body data."


def test_post_create_user_invalid_body(client):
    response = client.post("/users/", json={"username": "incomplete"})
    assert response.status_code == 400
    assert response.get_json() == {'email': ['Missing data for required field.'], 'password': [
        'Missing data for required field.']}


def test_post_create_user_duplicate_email(client):
    response = client.post("/users/", json={
        "username": "user1",
        "password": "password1",
        "email": "sameemail@example.com"
    })

    response = client.post("/users/", json={
        "username": "user2",
        "password": "password2",
        "email": "sameemail@example.com"
    })

    assert response.status_code == 400
    assert "Invalid data" in response.get_json()["message"]


def test_patch_user_flashcard_status(client, sample_user, sample_flashcard, access_token, db_session):
    db_session.add_all([sample_user, sample_flashcard])
    db_session.commit()

    response = client.patch(
        f"/users/flashcards/{sample_flashcard.id}",
        json={"status": "to-study"},
        headers={"Authorization": f"Bearer {access_token}"}
    )

    assert response.status_code == 204

    user_flashcard = db_session.query(UserFlashcard).filter_by(
        user_id=sample_user.id, flashcard_id=sample_flashcard.id
    ).first()

    assert user_flashcard is not None
    assert user_flashcard.status == "to-study"


def test_patch_invalid_status(client, sample_user, sample_flashcard, access_token, db_session):
    db_session.add_all([sample_user, sample_flashcard])
    db_session.commit()

    response = client.patch(
        f"/users/flashcards/{sample_flashcard.id}",
        json={"status": "invalid"},
        headers={"Authorization": f"Bearer {access_token}"}
    )

    assert response.status_code == 400
    assert response.get_json()["message"] == "Status inválido."


def test_patch_missing_status(client, sample_user, sample_flashcard, access_token, db_session):
    db_session.add_all([sample_user, sample_flashcard])
    db_session.commit()

    response = client.patch(
        f"/users/flashcards/{sample_flashcard.id}",
        json={},
        headers={"Authorization": f"Bearer {access_token}"}
    )

    assert response.status_code == 400
    assert response.get_json()["message"] == "Missing body data."
