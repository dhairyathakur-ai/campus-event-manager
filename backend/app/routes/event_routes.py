from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.event import Event
from app.models.user import User
from app.schemas.event_schema import EventCreate, EventOut

router = APIRouter(prefix="/api/events", tags=["events"])


@router.get("/", response_model=List[EventOut])
def get_events(db: Session = Depends(get_db)):
    return db.query(Event).all()


@router.post("/", response_model=EventOut)
def create_event(event: EventCreate, organizer_id: int, db: Session = Depends(get_db)):
    organizer = db.query(User).filter(User.id == organizer_id).first()
    if not organizer:
        raise HTTPException(status_code=404, detail="Organizer not found")

    new_event = Event(
        title=event.title,
        description=event.description,
        date=event.date,
        location=event.location,
        organizer_id=organizer_id,
    )
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event


@router.post("/{event_id}/register")
def register_for_event(event_id: int, user_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    user = db.query(User).filter(User.id == user_id).first()

    if not event or not user:
        raise HTTPException(status_code=404, detail="Event or user not found")

    if user in event.attendees:
        raise HTTPException(status_code=400, detail="Already registered")

    event.attendees.append(user)
    db.commit()
    return {"message": f"{user.name} registered for {event.title}"}