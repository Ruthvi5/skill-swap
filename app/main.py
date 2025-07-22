from fastapi import FastAPI
from app.routes import swap,user  # add this
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.models import APIKey
from fastapi.security import HTTPBearer
from fastapi.openapi.utils import get_openapi
bearer_scheme = HTTPBearer()

app = FastAPI()

# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later change to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Including user router")
app.include_router(user.router)

print("Including swap router")
app.include_router(swap.router)

@app.get("/")
async def root():
    return {"message": "SkillSwap API is running 🎉"}

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="SkillSwap API",
        version="1.0.0",
        description="SkillSwap Backend",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi




print("Including user router")
