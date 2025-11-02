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
    tmp_path = None
    try:
        # Save uploaded file temporarily
        tmp_dir = tempfile.gettempdir()
        tmp_path = os.path.join(tmp_dir, file.filename)
        async with aiofiles.open(tmp_path, "wb") as f:
            content = await file.read()
            await f.write(content)

        # Extract text + total from OCR
        with open(tmp_path, "rb") as f:
            ocr_result = extract_total_from_receipt(f.read())

        total = ocr_result.get("total")
        ocr_status = "success" if total is not None else "failed"
        # Upload to Cloudinary
        image_url = await upload_file_to_cloudinary(tmp_path)

        # Compute image size
        size_bytes = os.path.getsize(tmp_path)
        size_kb = size_bytes / 1024
        size_str = f"{size_kb:.2f} KB" if size_kb < 1024 else f"{size_kb / 1024:.2f} MB"

        # Determine status based on total
        status = "success" if total is not None else "failed"
        # Store in MongoDB
        filename = os.path.basename(file.filename)  # Ensure only base name
        receipt_doc = {
            "name": filename,
            "image_url": image_url,
            "size": size_str,
            "date": datetime.utcnow(),
            "total": total,
            "category": category,
            "status": status,  
            "userid": str(current_user["_id"]),
        }
        result = await receipts_collection.insert_one(receipt_doc)
        receipt_doc["_id"] = str(result.inserted_id)

        return {
            "success": True,
            "message": "Receipt uploaded successfully",
            "data": {
                "id": receipt_doc["_id"],
                "name": receipt_doc["name"],
                "image_url": receipt_doc["image_url"],
                "size": receipt_doc["size"],
                "date": receipt_doc["date"],
                "total": receipt_doc["total"],
                "category": receipt_doc["category"],
                "userid": receipt_doc["userid"],
                "status": ocr_status
            }
        }

    except Exception as e:
        print("❌ Error uploading receipt:", str(e))
        raise HTTPException(status_code=500, detail="Failed to process receipt")

    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)

@router.get("/recent")
async def get_recent_receipts(current_user: dict = Depends(get_current_user)):
    try:
        receipts = await receipts_collection.find(
            {"userid": str(current_user["_id"])}
        ).sort("date", -1).limit(5).to_list(length=5)
        
        return [
            {
                "id": str(receipt["_id"]),
                "name": receipt.get("name", "Receipt"),
                "size": receipt.get("size", "N/A"),
                "date": receipt["date"].strftime("%b %d, %Y"),
                "status": "failed" if receipt.get("total") is None else "success",
                "image_url": receipt["image_url"],
                "total": receipt.get("total"),
                "category": receipt.get("category")
            }
            for receipt in receipts
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))