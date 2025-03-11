import google.generativeai as genai # type: ignore
from dotenv import load_dotenv # type: ignore
import os
from flask_cors import CORS


load_dotenv() 

import requests
from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

def get_weather(city):
    """Fetch weather details for a given city."""
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        return {
            "temperature": data["main"]["temp"],
            "weather": data["weather"][0]["main"],
        }
    return None

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


# def generate_packing_list(city, duration, activities, weather, temperature):
#     model = genai.GenerativeModel("gemini-1.5-pro")

#     prompt = f"""
#     Generate a structured JSON packing list for a trip to {city} for {duration} days.
#     Weather: {weather}, Temperature: {temperature}°C. Activities planned: {', '.join(activities)}.

#     Return only a valid JSON object, nothing else. The JSON should have this format:
#     {{
#         "Clothing": ["T-shirts", "Shorts", "Jeans"],
#         "Toiletries": ["Toothbrush", "Sunscreen", "Deodorant"],
#         "Electronics": ["Phone", "Charger", "Power Bank"]
#     }}
#     """

#     response = model.generate_content(prompt)

#     # Ensure there is a valid response
#     if response and response.candidates:
#         generated_text = str(response.candidates[0].content)  # Convert Content object to string
#     else:
#         return {"error": "No response from Gemini API"}

#     try:
#         packing_list_json = json.loads(generated_text)  # Convert string to JSON
#         return packing_list_json
#     except json.JSONDecodeError:
#         print("Error: Invalid JSON received from Gemini API")
#         return {"error": "Invalid JSON format from API"}

import json
import re

def generate_packing_list(city, duration, activities, weather, temperature):
    model = genai.GenerativeModel("gemini-1.5-pro")

    prompt = f"""
    Generate a structured JSON packing list for a trip to {city} for {duration} days.
    Weather: {weather}, Temperature: {temperature}°C. Activities planned: {activities}.

    Return only a valid JSON object, nothing else. The JSON should have this format:
    {{
        "Clothing": ["T-shirts", "Shorts", "Jeans"],
        "Toiletries": ["Toothbrush", "Sunscreen", "Deodorant"],
        "Electronics": ["Phone", "Charger", "Power Bank"]
    }}
    """

    response = model.generate_content(prompt)
    # Remove markdown formatting using regex
    content = response.candidates[0].content.parts[0].text
    
    print("Response content type:", type(content))  # Debugging step
    print("Raw Response Content:", content)  # See what we are dealing with

    if not isinstance(content, str):
        raise TypeError(f"Expected a string but got {type(content)}")
    cleaned_content = re.sub(r"```json\n|\n```", "", content).strip()
    if response and response.candidates:
        try:
            #print("Response content:", response.candidates[0].content)
            
            return json.loads(cleaned_content)  # Convert response to JSON
        except json.JSONDecodeError:
            return {"error": "Invalid JSON format from Gemini API"}
    return {"error": "No response from Gemini API"}

# def generate_packing_list(city, duration, activities, weather, temperature):
#     model = genai.GenerativeModel("gemini-1.5-pro")

#     prompt = f"Generate a packing list for a trip to {city} for {duration} days. Weather: {weather}, Temperature: {temperature}°C. Activities planned: {', '.join(activities)}."
    
#     response = model.generate_content(prompt)
    
#     return response.text if response else "No response from Gemini API."


# @app.route('/get_packing_list', methods=['POST'])
# def get_packing_list():
#     """Generate a smart packing list based on trip details."""
#     data = request.json
#     city = data.get("city")
#     duration = data.get("duration")
#     activities = data.get("activities", "")

#     weather_info = get_weather(city)
#     if not weather_info:
#         return jsonify({"error": "Invalid city or weather data not found"}), 400

#     weather = weather_info["weather"]
#     temperature = weather_info["temperature"]

#     packing_items = generate_packing_list(city, duration, activities, weather, temperature)

#     return jsonify({
#         "city": city,
#         "duration": duration,
#         "weather": weather,
#         "temperature": temperature,
#         "packing_list": packing_items
#     })

@app.route('/get_packing_list', methods=['POST'])
def get_packing_list():
    """Generate a smart packing list based on trip details."""
    data = request.json
    city = data.get("city")
    duration = data.get("duration")
    activities = data.get("activities", "")

    # Validate inputs
    if not city or not duration:
        return jsonify({"error": "City and duration are required"}), 400

    # Fetch weather details
    weather_info = get_weather(city)
    if not weather_info:
        return jsonify({"error": "Invalid city or weather data not found"}), 400

    weather = weather_info["weather"]
    temperature = weather_info["temperature"]

    # Generate packing list using Gemini API
    packing_items = generate_packing_list(city, duration, activities, weather, temperature)

    return jsonify({
        "city": city,
        "duration": duration,
        "weather": weather,
        "temperature": temperature,
        "packing_list": packing_items  # Already in JSON format
    })

if __name__ == '__main__':
   app.run(debug=True)

