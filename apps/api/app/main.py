from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.pages import router as pages_router
from app.api.chapters import router as chapters_router
from app.api.export import router as export_router
from app.api.auth import router as auth_router
from app.api.projects import router as projects_router
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
        "https://sumi-3.onrender.com",  # Render
        "https://sumi-manga-editor.netlify.app",  # Netlify
        "https://sumi-manga-editor-production.netlify.app"  # Netlify Production
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
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(projects_router, prefix="/api/projects", tags=["projects"])
app.include_router(pages_router, prefix="/api/pages", tags=["pages"])
app.include_router(chapters_router, prefix="/api/chapters", tags=["chapters"])
app.include_router(export_router, prefix="/api/export", tags=["export"])

for route in app.routes:
    if hasattr(route, "methods"):
        methods = ", ".join(route.methods)
        print(f"Route: {route.path}, Methods: {methods}")