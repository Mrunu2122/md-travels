from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class Trip(BaseModel):
    date: datetime = Field(default_factory=datetime.utcnow)
    trip_date: str = Field(default_factory=lambda: datetime.utcnow().strftime('%Y-%m-%d'))
    total_trips: int = Field(ge=0)
    working_hours: str
    earnings_ola: float = Field(default=0.0, ge=0)
    earnings_uber: float = Field(default=0.0, ge=0)
    earnings_rapido: float = Field(default=0.0, ge=0)
    gross_earnings: float = Field(ge=0)

class Expense(BaseModel):
    date: datetime = Field(default_factory=datetime.utcnow)
    expense_date: str = Field(default_factory=lambda: datetime.utcnow().strftime('%Y-%m-%d'))
    fuel: float = Field(default=0.0, ge=0)
    other: float = Field(default=0.0, ge=0)

class Profile(BaseModel):
    name: str
    car_model: str
    rating: float = Field(default=5.0, ge=0, le=5) 