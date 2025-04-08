import os
import pandas as pd
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

# Define paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "svc_rbf_best_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "models", "scaler_best.pkl")
SUGGESTION_CSV_PATH = os.path.join(BASE_DIR, "data", "diet.csv")

# Load model, scaler, and CSV
try:
    model = joblib.load(MODEL_PATH) if os.path.exists(MODEL_PATH) else None
    scaler = joblib.load(SCALER_PATH) if os.path.exists(SCALER_PATH) else None
    diet_df = pd.read_csv(SUGGESTION_CSV_PATH) if os.path.exists(SUGGESTION_CSV_PATH) else None
    if model is None:
        print(f"❌ Model not found at {MODEL_PATH}")
    if scaler is None:
        print(f"❌ Scaler not found at {SCALER_PATH}")
    if diet_df is None:
        print(f"❌ Diet CSV not found at {SUGGESTION_CSV_PATH}")
    else:
        print("✅ Model, scaler, and diet CSV loaded successfully")
        print(f"Diet CSV columns: {diet_df.columns.tolist()}")
except Exception as e:
    print(f"❌ Error loading resources: {e}")
    model, scaler, diet_df = None, None, None

@app.route('/')
def home():
    return jsonify({
        "status": "Chatbot backend running!",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None,
        "diet_csv_loaded": diet_df is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    if not model or not scaler or diet_df is None:
        return jsonify({"error": "Server resources not loaded. Check logs."}), 500

    try:
        data = request.get_json()
        if not data or "features" not in data:
            return jsonify({"error": "Invalid payload. Expected {'features': [...]}"}), 400

        features = data["features"]
        if len(features) != 20:
            return jsonify({"error": f"Expected 20 features, got {len(features)}"}), 400

        features_array = np.array(features).reshape(1, -1)
        print(f"Features shape: {features_array.shape}")
        scaled_features = scaler.transform(features_array)
        print(f"Scaled features shape: {scaled_features.shape}")
        prediction = model.predict(scaled_features)[0]
        print(f"Raw prediction: {prediction}")
        dosha_index = int(prediction)  # Convert float to int
        dosha = ["vata", "pitta", "kapha"][dosha_index]
        print(f"Predicted dosha: {dosha}")

        suggestions_row = diet_df[diet_df['dosha'].str.lower() == dosha].iloc[0]
        suggestions = {
            "consume": suggestions_row['consume'].split(", "),
            "avoid": suggestions_row['avoid'].split(", "),
            "lifestyle": suggestions_row['lifestyle'].split(", ")
        }

        return jsonify({"dosha": dosha, "suggestions": suggestions})
    except Exception as e:
        print(f"❌ Prediction error: {str(e)}")
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)