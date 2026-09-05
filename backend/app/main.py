from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes import event_routes, user_routes

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Campus Event Manager")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten this in production
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(event_routes.router)
app.include_router(user_routes.router)


@app.get("/")
def root():
    return {"message": "Campus Event Manager API running"}