# 🧠 RD Medicine Flashcards App Challenge

Welcome to the technical challenge! We're excited to see how you think, build, and design.

At RD Medicine, we're building tools that help medical students retain more, study smarter, and succeed in tough exams. This challenge mirrors a simplified version of our real product.

---

## 🚀 The Challenge

Build a **full stack flashcards app** that allows users to:

- Authenticate (login/signup)
- Study flashcards (flip, mark as studied)
- View flashcards dashboard with filters:
  - To Study
  - Studied

You’re free to choose **mobile (React Native/Expo)** or **web (Next.js)** for the frontend — whichever you’re more comfortable with or want to show off!

---

## 🛠 Tech Requirements

### Frontend (choose one)
- **Web**: Next.js + TypeScript + Tailwind ✅
- **Mobile**: React Native or Expo + TypeScript

### Backend
- Python + Flask (REST API)
- You may use SQLite ✅, DynamoDB (local), or mock in-memory data

---

## 📚 Suggested Features

### Core
- ✅ User signup/login (mock or real)
- ✅ Flashcard study flow:
  - View front side (question/symptoms)
  - Flip for answer
  - Mark as studied
- ✅ Flashcards dashboard:
  - Filter by To Study / Studied

### Bonus (optional)
- 🧠 Add spaced repetition logic
- 🖼️ Support image flashcards ✅
- 📊 Add simple analytics (e.g. % studied) ✅
- 🧬 Add a "smart review" suggestion (using embeddings or basic scoring)
- 🧰 Use Docker for deployment

---

### ✅ Backend Tests (Required)

We’d like you to include at least **basic automated tests** for your backend logic.

#### What you should test:
- ✅ At least 1 route from your API (e.g., `GET /flashcards`, `POST /login`)
- ✅ One core logic function (e.g., mark flashcard as studied)

#### What we’ll look for:
- Proper use of a test framework like `pytest` or `unittest`
- Clear file organization (`/tests`, `test_*.py`)
- Reproducibility (`requirements.txt` or `pip install -r requirements-dev.txt`)

> Bonus for using mocks/stubs and covering edge cases — but keep it simple and clean.

#### Running tests
```
cd backend
pytest
```
---

## 🧪 What We'll Evaluate

- 📐 Code structure & readability
- 💡 Product thinking & UX
- 🧰 Backend logic & API design
- 🧪 Test coverage and structure for the backend
- ⚡ Creativity & polish
- 📝 Communication: comments, commit messages, and this README

---

## 📦 How to Submit

1. Push to a **private GitHub repo**
2. Add Thiago Maffei (thiagopmaffeid@gmail.com) as a **collaborator**
3. Include a short Loom (optional) if you want to walk us through your work
4. ✅ Include instructions in your README to run your backend tests
   - e.g., `pytest` or `python -m unittest discover`

---

## 🧠 Your Thought Process

### What did you build?
I built a web-based flashcard app using Next.js and Flask, focusing on UX, image-supported flashcards, and analytics to help users track their learning progress.

### Why did you choose web/mobile?
I chose web to showcase my fullstack skills across both backend APIs and frontend development. It allowed me to demonstrate the full lifecycle of a web application — from database modeling and API design to creating friendly user interfaces.


### What were your architecture decisions?
I built the backend with Flask, using the Repository Pattern for separation of concerns and the Factory Pattern for testability. Routes are organized with MethodViews for cleaner method-based logic. On the frontend, I used Next.js with React, managing flashcard state via Context. I used Next.js API routes to handle JWT authentication server-side, keeping tokens secure and enabling better control over auth logic. I also built custom hooks for fetching flashcards and a middleware for smart redirects based on user auth statu

### If you had more time, what would you add?
* Improve responsiveness across different devices
* Add tests for all routes and use an entity factory for cleaner test data
* Implement user roles and enforce them in the API for better security
* Add a feature for users to mark questions as right or wrong, which would automatically mark them as "studied" and allow for future analytics or adaptive learning features

---

## 🧠 Mock Data (if needed)

You can start with a sample list of flashcards:

```json
[
  {
    "id": 1,
    "question": "22-year-old woman presents with fever and lower abdominal pain. Most likely diagnosis?",
    "answer": "Pelvic Inflammatory Disease",
    "status": "to-study"
  },
  {
    "id": 2,
    "question": "What is the first-line treatment for streptococcal pharyngitis?",
    "answer": "Penicillin V",
    "status": "studied"
  }
]
```

---

## 📞 Contact Us

Have any questions or need clarification?

**Email:** thiagopmaffeid@gmail.com  
We’re happy to help!

---

If you’re managing the challenge repo, don’t forget to:

- [x] Create a private GitHub repository (e.g., `rdmedicine-flashcards-challenge`)
- [x] Add `thiagopmaffeid@gmail.com` as a **collaborator**
- [x] Paste this `README.md` as the root documentation

---

Good luck — and have fun! 🚀
