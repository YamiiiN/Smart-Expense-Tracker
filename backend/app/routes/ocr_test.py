from fastapi import APIRouter, UploadFile, File, HTTPException
from app.utils.ocr import extract_total_from_receipt
import aiofiles, os, tempfile

router = APIRouter(prefix="/ocr", tags=["OCR Test"])

@router.post("/extract")
async def extract_text_from_receipt(file: UploadFile = File(...)):
    """
    Upload an image and return the extracted text + total (no DB or auth needed)
    """
    try:
        tmp_dir = tempfile.gettempdir()
        tmp_path = os.path.join(tmp_dir, file.filename)

        async with aiofiles.open(tmp_path, "wb") as f:
            content = await file.read()
            await f.write(content)

        # Run OCR
        with open(tmp_path, "rb") as f:
            ocr_result = extract_total_from_receipt(f.read())

        return {
            "success": True,
            "message": "OCR extraction complete",
            "total": ocr_result.get("total"),
            "raw_text": ocr_result.get("raw_text"),
        }

    except Exception as e:
        print("❌ OCR error:", str(e))
        raise HTTPException(status_code=500, detail="Failed to extract text")

    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
