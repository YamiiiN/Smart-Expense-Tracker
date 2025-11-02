# import re
# import tempfile
# from paddleocr import PaddleOCR

# ocr_model = PaddleOCR(use_angle_cls=True, lang='en')

# def extract_total_from_receipt(file):
#     """
#     Extract total amount from receipt using OCR.
#     """
#     with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
#         tmp.write(file)
#         tmp_path = tmp.name

#     result = ocr_model.ocr(tmp_path, cls=True)
#     all_text = " ".join([line[1][0] for line in result[0]])

#     # Look for total amount patterns
#     total_pattern = r"(?:total|amount|grand total)\s*[:\-]?\s*\$?\s*([\d,]+\.?\d*)"
#     match = re.search(total_pattern, all_text, re.IGNORECASE)
#     total = None
#     if match:
#         total = float(match.group(1).replace(",", ""))

#     return {
#         "total": total,
#         "raw_text": all_text,
#     }


import re
import tempfile
from paddleocr import PaddleOCR

ocr_model = PaddleOCR(use_angle_cls=True, lang='en')

def extract_total_from_receipt(file):
    """
    Extract total amount from receipt using OCR.
    Handles PHP, TOTAL_DUE, GRAND TOTAL, etc.
    Ignores unrelated digits like item counts.
    """
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
        tmp.write(file)
        tmp_path = tmp.name

    result = ocr_model.ocr(tmp_path, cls=True)
    all_text = " ".join([line[1][0] for line in result[0]])

    # -------------------------------
    # Regex patterns to capture totals
    # -------------------------------
    # Handles TOTAL, TOTAL_DUE, AMOUNT DUE, GRAND TOTAL, PHP, ₱, etc.
    patterns = [
        r"(?:total\s*due|grand\s*total|amount\s*due|total)\s*[:\-]?\s*(?:PHP|₱)?\s*([\d,]+\.?\d*)",
        r"(?:PHP|₱)\s*([\d,]+\.?\d*)",
    ]

    total = None

    for pattern in patterns:
        matches = re.findall(pattern, all_text, re.IGNORECASE)
        if matches:
            # Clean up invalid matches — skip single digits or tiny numbers
            valid_amounts = [
                m for m in matches
                if len(m.replace(",", "").replace(".", "")) > 2  # avoid '3', '25', etc.
            ]
            if valid_amounts:
                # Take the last one — usually the real total at the bottom
                total_str = valid_amounts[-1]
                try:
                    total = float(total_str.replace(",", ""))
                except:
                    continue

    return {
        "total": total,
        "raw_text": all_text,
    }
