# app/routes/stats.py
from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from app.core.auth import get_current_user
from app.core.db import receipts_collection
from bson.son import SON

router = APIRouter(prefix="/stats", tags=["Statistics"])

# =========================
# 📅 Monthly Total Expenses
# =========================
@router.get("/monthly-expenses")
async def get_monthly_expenses(current_user: dict = Depends(get_current_user)):
    """
    Returns total expenses per month for the current user.
    Used for the bar chart.
    """
    try:
        pipeline = [
            {"$match": {"userid": str(current_user["_id"]), "total": {"$ne": None}}},
            {
                "$group": {
                    "_id": {
                        "year": {"$year": "$date"},
                        "month": {"$month": "$date"},
                    },
                    "total_expense": {"$sum": "$total"},
                }
            },
            {"$sort": SON([("_id.year", 1), ("_id.month", 1)])}
        ]

        data = await receipts_collection.aggregate(pipeline).to_list(length=None)

        formatted = [
            {
                "month": f"{item['_id']['month']:02d}-{item['_id']['year']}",
                "total": round(item["total_expense"], 2)
            }
            for item in data
        ]

        return {"success": True, "data": formatted}

    except Exception as e:
        print("❌ Error fetching monthly expenses:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch monthly stats")


# =========================
# 🍔 Total Per Category
# =========================
@router.get("/category-totals")
async def get_category_totals(current_user: dict = Depends(get_current_user)):
    """
    Returns total expenses grouped by category.
    Used for the horizontal bar chart.
    """
    try:
        pipeline = [
            {"$match": {"userid": str(current_user["_id"]), "total": {"$ne": None}}},
            {
                "$group": {
                    "_id": "$category",
                    "total_expense": {"$sum": "$total"},
                }
            },
            {"$sort": {"total_expense": -1}}
        ]

        data = await receipts_collection.aggregate(pipeline).to_list(length=None)

        formatted = [
            {"category": item["_id"], "total": round(item["total_expense"], 2)}
            for item in data
        ]

        return {"success": True, "data": formatted}

    except Exception as e:
        print("❌ Error fetching category totals:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch category totals")


# =========================
# 🥧 Category Percentage
# =========================
@router.get("/category-percentage")
async def get_category_percentage(current_user: dict = Depends(get_current_user)):
    """
    Returns percentage of total expenses per category.
    Used for the pie chart.
    """
    try:
        pipeline = [
            {"$match": {"userid": str(current_user["_id"]), "total": {"$ne": None}}},
            {
                "$group": {
                    "_id": "$category",
                    "total_expense": {"$sum": "$total"},
                }
            }
        ]

        data = await receipts_collection.aggregate(pipeline).to_list(length=None)
        total_sum = sum(item["total_expense"] for item in data) or 1

        formatted = [
            {
                "category": item["_id"],
                "percentage": round((item["total_expense"] / total_sum) * 100, 2),
                "amount": round(item["total_expense"], 2)
            }
            for item in data
        ]

        return {"success": True, "data": formatted}

    except Exception as e:
        print("❌ Error fetching category percentages:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch category percentages")
