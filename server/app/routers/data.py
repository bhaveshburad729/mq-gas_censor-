from fastapi import APIRouter, Depends, HTTPException, Header, status
from sqlalchemy.orm import Session
from .. import database, models, schemas

router = APIRouter(
    prefix="/api/v1",
    tags=["data"]
)

def calculate_status(gas: float, temperature: float, distance: float) -> str:
    # Example logic
    if gas > 1000 or distance < 20: 
        return "DANGER"
    elif gas > 500 or temperature > 40:
        return "WARNING"
    return "SAFE"

@router.post("/ingest", response_model=schemas.SensorDataResponse)
def ingest_data(
    data: schemas.SensorDataCreate, 
    device_token: str = Header(..., alias="Device-Token"), # ESP32 sends this header
    db: Session = Depends(database.get_db)
):
    # Authenticate device
    device = db.query(models.Device).filter(models.Device.device_id == data.device_id).first()
    if not device:
         raise HTTPException(status_code=404, detail="Device not found")
    
    # Secure header check (simple string match)
    if device.device_token != device_token:
        raise HTTPException(status_code=401, detail="Invalid Device Token")

    status_val = calculate_status(data.gas, data.temperature, data.distance)

    new_reading = models.SensorData(
        device_id=data.device_id,
        gas=data.gas,
        temperature=data.temperature,
        humidity=data.humidity,
        distance=data.distance,
        status=status_val
    )
    
    db.add(new_reading)
    db.commit()
    db.refresh(new_reading)
    
    return new_reading
