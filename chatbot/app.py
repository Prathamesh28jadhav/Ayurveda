import os
import pandas as pd
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "svc_rbf_best_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "models", "scaler_best.pkl")
SUGGESTION_CSV_PATH = os.path.join(BASE_DIR, "data", "diet.csv")

# Load model, scaler, and CSV (as in your code)
try:
    model = joblib.load(MODEL_PATH) if os.path.exists(MODEL_PATH) else None
    scaler = joblib.load(SCALER_PATH) if os.path.exists(SCALER_PATH) else None
    diet_df = pd.read_csv(SUGGESTION_CSV_PATH) if os.path.exists(SUGGESTION_CSV_PATH) else None
    # Rest of loading logic...
except Exception as e:
    print(f"❌ Error loading: {e}")

@app.route('/')
def home():
    return "Chatbot backend running!"

@app.route('/predict', methods=['POST'])
def predict():
    # Your predict logic...
    return jsonify({"dosha": "vata", "suggestions": {...}})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)  # Remove debug=True for production