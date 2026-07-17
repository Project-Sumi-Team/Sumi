from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Sumi API",
    description="Backend API for Sumi Manga Editor",
    version="0.1.0"
)

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite
        "http://localhost:3000"   # React fallback
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Sumi API running",
        "version": "0.1.0",
        "status": "healthy"
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok"
    }