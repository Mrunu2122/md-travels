from fastapi import APIRouter, HTTPException, Query
from .models import Trip, Expense, Profile
from .db import db
from typing import List

router = APIRouter()

def to_int(value):
    try:
        return int(round(float(value)))
    except Exception:
        return 0

# --- Trips ---
@router.post("/trips", response_model=Trip)
async def add_trip(trip: Trip):
    trip_dict = trip.dict()
    trip_dict['earnings_ola'] = to_int(trip_dict['earnings_ola'])
    trip_dict['earnings_uber'] = to_int(trip_dict['earnings_uber'])
    trip_dict['earnings_rapido'] = to_int(trip_dict['earnings_rapido'])
    trip_dict['gross_earnings'] = to_int(trip_dict['gross_earnings'])
    result = await db.trips.insert_one(trip_dict)
    trip_dict["_id"] = str(result.inserted_id)
    return trip_dict

@router.get("/trips", response_model=List[Trip])
async def get_trips(driver_id: str = Query(default="default")):
    return await db.trips.find({"driver_id": driver_id}).to_list(100)

# --- Expenses ---
@router.post("/expenses", response_model=Expense)
async def add_expense(expense: Expense):
    expense_dict = expense.dict()
    expense_dict['fuel'] = to_int(expense_dict['fuel'])
    expense_dict['other'] = to_int(expense_dict['other'])
    result = await db.expenses.insert_one(expense_dict)
    expense_dict["_id"] = str(result.inserted_id)
    return expense_dict

@router.get("/expenses", response_model=List[Expense])
async def get_expenses(driver_id: str = Query(default="default")):
    return await db.expenses.find({"driver_id": driver_id}).to_list(100)

# --- Profile ---
@router.get("/profile", response_model=Profile)
async def get_profile(driver_id: str = Query(default="default")):
    profile = await db.profile.find_one({"driver_id": driver_id})
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.post("/profile", response_model=Profile)
async def update_profile(profile: Profile):
    profile_dict = profile.dict()
    profile_dict['rating'] = to_int(profile_dict['rating'])
    await db.profile.delete_many({"driver_id": profile_dict['driver_id']})
    await db.profile.insert_one(profile_dict)
    return profile_dict 