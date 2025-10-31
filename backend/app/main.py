from fastapi import FastAPI
from app.routes import user

app = FastAPI(
    title="Smart Expense Tracker",
    description="Handles OCR and expense tracking functionalities",
    version="1.0.0"
)


app.include_router(user.router) 

@app.get("/")
def root():
    return {"message": "Welcome to Smart Expense Tracker"}
