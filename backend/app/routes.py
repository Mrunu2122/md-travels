from fastapi import APIRouter, HTTPException
from .models import Trip, Expense, Profile
from .db import db
from typing import List

router = APIRouter()

def round_to_integer(value: float) -> int:
    """Convert value to integer to avoid floating point precision issues"""
    return round(value)

# --- Trips ---
@router.post("/trips", response_model=Trip)
async def add_trip(trip: Trip):
    trip_dict = trip.dict()
    
    # Ensure all numeric values are converted to integers
    trip_dict['earnings_ola'] = round_to_integer(trip_dict['earnings_ola'])
    trip_dict['earnings_uber'] = round_to_integer(trip_dict['earnings_uber'])
    trip_dict['earnings_rapido'] = round_to_integer(trip_dict['earnings_rapido'])
    trip_dict['gross_earnings'] = round_to_integer(trip_dict['gross_earnings'])
    
    result = await db.trips.insert_one(trip_dict)
    trip_dict["_id"] = str(result.inserted_id)
    return trip_dict

@router.get("/trips", response_model=List[Trip])
async def get_trips():
    trips = await db.trips.find().to_list(100)
    return trips

# --- Expenses ---
@router.post("/expenses", response_model=Expense)
async def add_expense(expense: Expense):
    expense_dict = expense.dict()
    
    # Ensure all numeric values are converted to integers
    expense_dict['fuel'] = round_to_integer(expense_dict['fuel'])
    expense_dict['other'] = round_to_integer(expense_dict['other'])
    
    result = await db.expenses.insert_one(expense_dict)
    expense_dict["_id"] = str(result.inserted_id)
    return expense_dict

@router.get("/expenses", response_model=List[Expense])
async def get_expenses():
    expenses = await db.expenses.find().to_list(100)
    return expenses

# --- Profile ---
@router.get("/profile", response_model=Profile)
async def get_profile():
    profile = await db.profile.find_one()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.post("/profile", response_model=Profile)
async def update_profile(profile: Profile):
    profile_dict = profile.dict()
    profile_dict['rating'] = round_to_integer(profile_dict['rating'])
    
    await db.profile.delete_many({})
    await db.profile.insert_one(profile_dict)
    return profile_dict 