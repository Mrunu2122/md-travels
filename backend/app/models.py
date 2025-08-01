from pydantic import BaseModel, Field
from datetime import datetime

class Trip(BaseModel):
    date: datetime = Field(default_factory=datetime.utcnow)
    trip_date: str = Field(default_factory=lambda: datetime.utcnow().strftime('%Y-%m-%d'))
    driver_id: str = Field(default="dad")  # Only for dad
    total_trips: int = Field(ge=0)
    working_hours: str
    earnings_ola: int = Field(default=0, ge=0)
    earnings_uber: int = Field(default=0, ge=0)
    earnings_rapido: int = Field(default=0, ge=0)
    gross_earnings: int = Field(ge=0)

class Expense(BaseModel):
    date: datetime = Field(default_factory=datetime.utcnow)
    expense_date: str = Field(default_factory=lambda: datetime.utcnow().strftime('%Y-%m-%d'))
    driver_id: str = Field(default="dad")  # Only for dad
    fuel: int = Field(default=0, ge=0)
    other: int = Field(default=0, ge=0)

class Profile(BaseModel):
    driver_id: str = Field(default="dad")  # Only for dad
    name: str
    car_model: str
    rating: int = Field(default=5, ge=0, le=5) 