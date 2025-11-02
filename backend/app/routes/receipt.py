from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from datetime import datetime
from app.core.auth import get_current_user
from app.core.db import receipts_collection
from app.utils.cloudinary import upload_file_to_cloudinary
from app.utils.ocr import extract_total_from_receipt
import aiofiles, os, tempfile

router = APIRouter(prefix="/receipt", tags=["Receipts"])

@router.post("/upload")
async def upload_receipt(
    category: str = Form(...),
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    try:
        tmp_dir = tempfile.gettempdir()
        tmp_path = os.path.join(tmp_dir, file.filename)
        async with aiofiles.open(tmp_path, "wb") as f:
            content = await file.read()
            await f.write(content)

        with open(tmp_path, "rb") as f:
            ocr_result = extract_total_from_receipt(f.read())

        total = ocr_result.get("total")

        image_url = await upload_file_to_cloudinary(tmp_path)

        receipt_doc = {
            "image_url": image_url,
            "date": datetime.utcnow(),
            "total": total,
            "category": category,
            "userid": str(current_user["_id"]),
        }
        result = await receipts_collection.insert_one(receipt_doc)

        receipt_doc["_id"] = str(result.inserted_id)

        return {
            "success": True,
            "message": "Receipt uploaded successfully",
            "data": {
                "id": receipt_doc["_id"],
                "image_url": receipt_doc["image_url"],
                "date": receipt_doc["date"],
                "total": receipt_doc["total"],
                "category": receipt_doc["category"],
                "userid": receipt_doc["userid"],
            }
        }

    except Exception as e:
        print("❌ Error uploading receipt:", str(e))
        raise HTTPException(status_code=500, detail="Failed to process receipt")

    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
