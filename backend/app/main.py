from fastapi import FastAPI, HTTPException, UploadFile, File, Depends
from app.db import users_collection
from app.models.schemas import UserCreate, UserOut, Token
from app.auth import get_password_hash, verify_password, create_access_token, get_current_user
from bson import ObjectId
import aiofiles
import os
from app.cloudinary_utils import upload_file_to_cloudinary

app = FastAPI()

@app.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = get_password_hash(user.password)

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed,
        "avatar_url": user.avatar_url
    }

    result = await users_collection.insert_one(new_user)

    created_user = await users_collection.find_one({"_id": result.inserted_id})

    return UserOut(
        id=str(created_user["_id"]),
        name=created_user["name"],
        email=created_user["email"],
        avatar_url=created_user.get("avatar_url")
    )

@app.post("/login", response_model=Token)
async def login(form_data: dict):
    email = form_data.get("email")
    password = form_data.get("password")
    user = await users_collection.find_one({"email": email})
    if not user or not verify_password(password, user["password"]):
        raise HTTPException(401, "Invalid credentials")
    token = create_access_token({"sub": str(user["_id"]), "email": user["email"]})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/upload-avatar")
async def upload_avatar(file: UploadFile = File(...)):
    # Save to temp then upload to Cloudinary
    tmp_path = f"/tmp/{file.filename}"
    async with aiofiles.open(tmp_path, "wb") as f:
        content = await file.read()
        await f.write(content)
    url = upload_file_to_cloudinary(tmp_path)
    try:
        os.remove(tmp_path)
    except:
        pass
    return {"url": url}

@app.get("/me", response_model=UserOut)
async def read_current_user(current_user: dict = Depends(get_current_user)):
    return {
        "id": str(current_user["_id"]),
        "name": current_user["name"],
        "email": current_user["email"],
        "avatar_url": current_user.get("avatar_url")
    }