from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    class Config:
        from_attributes = True

# Device Schemas
class DeviceBase(BaseModel):
    device_id: str

class DeviceCreate(DeviceBase):
    device_token: str

class DeviceResponse(DeviceBase):
    device_token: str
    created_at: datetime
    class Config:
        from_attributes = True

# Sensor Data Schemas
class SensorDataCreate(BaseModel):
    device_id: str
    gas: float
    temperature: float
    humidity: float
    distance: float

class SensorDataResponse(SensorDataCreate):
    id: int
    timestamp: datetime
    status: str
    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
