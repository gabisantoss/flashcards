from src.app_factory import create_app

app = create_app(db_url="sqlite:///flashcards.db")

if __name__ == "__main__":
    app.run(debug=True)
