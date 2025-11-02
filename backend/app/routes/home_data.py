from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from app.core.auth import get_current_user
from app.core.db import receipts_collection
from bson.son import SON

router = APIRouter(prefix="/home", tags=["Home"])

@router.get("/data")
async def get_home_data(current_user: dict = Depends(get_current_user)):
    """
    Returns:
    - total_expenses_this_month (float)
    - month_label (e.g. "November 2025")
    - uploads: list of receipts from latest to oldest with fields:
        { name, category, total, date (ISO string), image_url }
    """
    try:
        now = datetime.utcnow()
        year = now.year
        month = now.month

        # Aggregate total for current month
        pipeline_total = [
            {
                "$match": {
                    "userid": str(current_user["_id"]),
                    "total": {"$ne": None},
                    "$expr": {
                        "$and": [
                            {"$eq": [{"$year": "$date"}, year]},
                            {"$eq": [{"$month": "$date"}, month]}
                        ]
                    }
                }
            },
            {
                "$group": {
                    "_id": None,
                    "monthly_total": {"$sum": "$total"}
                }
            }
        ]

        total_result = await receipts_collection.aggregate(pipeline_total).to_list(length=1)
        monthly_total = round(total_result[0]["monthly_total"], 2) if total_result else 0.0

        # Recent uploads (latest -> oldest). Return category, total, date, name, image_url
        cursor = receipts_collection.find({"userid": str(current_user["_id"])}) \
            .sort("date", -1) \
            .limit(10)

        uploads = []
        async for r in cursor:
            uploads.append({
                "id": str(r.get("_id")),
                "name": r.get("name"),
                "category": r.get("category"),
                "total": r.get("total"),
                "date": r.get("date").isoformat() if r.get("date") else None,
                "image_url": r.get("image_url")
            })

        # month_label = now.strftime("%B %Y")
        month_label = datetime.utcnow().strftime("%b %Y")  # 'Nov 2025'


        return {
            "success": True,
            "data": {
                "monthly_total": monthly_total,
                "month_label": month_label,
                "uploads": uploads
            }
        }

    except Exception as e:
        print("❌ Error fetching home data:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch home data")