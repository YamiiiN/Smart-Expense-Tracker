# app/routes/user.py
from fastapi import APIRouter, HTTPException, UploadFile, File, Depends, Form
from app.core.db import users_collection
from app.models.user import UserCreate, UserOut, Token
from app.core.auth import get_password_hash, verify_password, create_access_token, get_current_user
from app.utils.cloudinary import upload_file_to_cloudinary
import aiofiles
import os
import tempfile

from pydantic import BaseModel

class LoginInput(BaseModel):
    email: str
    password: str

router = APIRouter(prefix="/user", tags=["Users"])

@router.post("/register", response_model=UserOut)
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

# @router.post("/login", response_model=Token)
# async def login(form_data: dict):
#     email = form_data.get("email")
#     password = form_data.get("password")
#     user = await users_collection.find_one({"email": email})
#     if not user or not verify_password(password, user["password"]):
#         raise HTTPException(401, "Invalid credentials")
#     token = create_access_token({"sub": str(user["_id"]), "email": user["email"]})
#     return {"access_token": token, "token_type": "bearer"}
@router.post("/login", response_model=Token)
async def login(data: LoginInput):
    email = data.email
    password = data.password

    user = await users_collection.find_one({"email": email})
    if not user or not verify_password(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(user["_id"]), "email": user["email"]})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/upload-avatar")
async def upload_avatar(file: UploadFile = File(...)):
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

@router.get("/me", response_model=UserOut)
async def read_current_user(current_user: dict = Depends(get_current_user)):
    return {
        "id": str(current_user["_id"]),
        "name": current_user["name"],
        "email": current_user["email"],
        "avatar_url": current_user.get("avatar_url")
    }

@router.put("/me/update")
async def update_current_user(
    name: str = Form(...),
    email: str = Form(...),
    avatar: UploadFile = File(None),
    current_user: dict = Depends(get_current_user)
):
    try:
        update_data = {"name": name, "email": email}

        if avatar:
            tmp_dir = tempfile.gettempdir()
            tmp_path = os.path.join(tmp_dir, avatar.filename)

            async with aiofiles.open(tmp_path, "wb") as f:
                content = await avatar.read()
                await f.write(content)

            url = await upload_file_to_cloudinary(tmp_path)
            try:
                os.remove(tmp_path)
            except Exception as e:
                print("Warning: could not delete temp file:", e)
            update_data["avatar_url"] = url

        await users_collection.update_one(
            {"_id": current_user["_id"]},
            {"$set": update_data}
        )

        updated_user = await users_collection.find_one({"_id": current_user["_id"]})

        return {
            "success": True,
            "message": "Profile updated successfully",
            "user": {
                "id": str(updated_user["_id"]),
                "name": updated_user["name"],
                "email": updated_user["email"],
                "avatar_url": updated_user.get("avatar_url")
            }
        }

    except Exception as e:
        print("❌ Error updating user:", e)
        raise HTTPException(status_code=500, detail="Failed to update profile")
