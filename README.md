# Campus Event Manager

A full-stack web app for managing and registering for campus events. Built with FastAPI (Python) and React.

## Features
- User signup/login with JWT authentication
- Role-based access (student / organizer)
- Organizers can create events
- Students can view and register for events

## Tech Stack
- **Backend:** FastAPI, SQLAlchemy, SQLite
- **Frontend:** React (Vite), Axios

## Running locally

### Backend
\`\`\`
cd backend/
pip install -r requirements.txt/
python -m uvicorn app.main:app --reload
\`\`\`

### Frontend
\`\`\`
cd frontend/
npm install/
npm run dev
\`\`\`
