import requests

url = "http://localhost:8000/auth/register"
# Using the IP user mentioned just in case, but localhost is safer for me to test via run_command
# url = "http://192.168.1.7:8000/auth/register" 

payload = {
    "email": "testuser@example.com",
    "password": "securepassword",
    "full_name": "Test User",
    "phone_number": "1234567890"
}

try:
    print(f"Sending POST to {url}...")
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
except Exception as e:
    print(f"Request failed: {e}")
