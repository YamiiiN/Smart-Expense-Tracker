from fastapi import FastAPI
from app.routes import user
from app.routes import receipt
from app.routes import ocr_test
from app.routes import stats
from app.routes import home_data

app = FastAPI(
    title="Smart Expense Tracker",
    description="Handles OCR and expense tracking functionalities",
    version="1.0.0"
)


app.include_router(user.router) 
app.include_router(receipt.router)
app.include_router(ocr_test.router)
app.include_router(stats.router)
app.include_router(home_data.router)

@app.get("/")
def root():
    return {"message": "Welcome to Smart Expense Tracker"}
