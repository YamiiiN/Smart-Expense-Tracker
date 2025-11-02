import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv
load_dotenv()

cloudinary.config(
  cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"),
  api_key = os.getenv("CLOUDINARY_API_KEY"),
  api_secret = os.getenv("CLOUDINARY_API_SECRET"),
)

async def upload_file_to_cloudinary(file_path: str):
    # cloudinary.uploader.upload is blocking — run in thread pool if needed
    result = cloudinary.uploader.upload(file_path)
    return result.get("secure_url")