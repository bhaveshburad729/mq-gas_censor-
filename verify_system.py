import requests
import time
import random

BASE_URL = "http://localhost:8000"

def simulate_esp32(device_id, device_token):
    print(f"Simulating ESP32 for {device_id}...")
    headers = {"Device-Token": device_token}
    
    print("Sending data... (Press Ctrl+C to stop)")
    # Run for 60 seconds
    for i in range(60):
        data = {
            "device_id": device_id,
            "gas": random.uniform(200, 1200),
            "temperature": random.uniform(20, 45),
            "humidity": random.uniform(30, 80),
            "distance": random.uniform(10, 100)
        }
        
        try:
            resp = requests.post(f"{BASE_URL}/api/v1/ingest", json=data, headers=headers)
            print(f"[{i+1}/60] Sent: Gas={data['gas']:.0f}ppm Temp={data['temperature']:.1f}C -> Status: {resp.status_code}")
        except Exception as e:
            print(f"Ingest failed: {e}")
        
        time.sleep(1)

if __name__ == "__main__":
    # USER PROVIDED CREDENTIALS
    DEVICE_ID = "ESP-test1"
    DEVICE_TOKEN = "c6d63d66cf504ef82c2adee492c2b82a"
    
    simulate_esp32(DEVICE_ID, DEVICE_TOKEN)
