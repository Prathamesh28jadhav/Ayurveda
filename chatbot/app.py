import joblib
import os
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ Paths to model, scaler, and CSV using absolute paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "svc_rbf_best_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "models", "scaler_best.pkl")
SUGGESTION_CSV_PATH = os.path.join(BASE_DIR, "data", "diet.csv")

# ✅ Load model, scaler, and CSV
try:
    model = joblib.load(MODEL_PATH) if os.path.exists(MODEL_PATH) else None
    scaler = joblib.load(SCALER_PATH) if os.path.exists(SCALER_PATH) else None

    print(f"✅ Model Type: {type(model)}")
    print(f"✅ Scaler Type: {type(scaler)}")

    if not model or not scaler:
        print("⚠️ Error: Model or Scaler not loaded properly!")

    # ✅ Extract original feature names from the scaler
    if hasattr(scaler, "feature_names_in_"):
        scaler_feature_names = scaler.feature_names_in_.tolist()
        print(f"✅ Scaler Feature Names: {scaler_feature_names}")
    else:
        print("⚠️ Scaler has no feature names. Using default names.")
        scaler_feature_names = [str(i) for i in range(1, 21)]

except Exception as e:
    print(f"❌ Error loading model/scaler: {e}")

# ✅ Load suggestions CSV
diet_df = pd.read_csv(SUGGESTION_CSV_PATH) if os.path.exists(SUGGESTION_CSV_PATH) else None

# ✅ Normalize CSV column names and values
if diet_df is not None:
    diet_df.columns = diet_df.columns.str.strip().str.lower()  # Normalize column names
    print(f"✅ CSV Columns: {diet_df.columns.tolist()}")  # Display normalized column names


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = data['features']

        # ✅ Ensure features are properly formatted
        if len(features) != len(scaler_feature_names):
            return jsonify({"error": "Feature length mismatch"}), 400

        print(f"📊 User Inputs: {features}")

        # ✅ Create DataFrame with correct feature names
        df = pd.DataFrame([features], columns=scaler_feature_names)

        # ✅ Scale the features
        if hasattr(scaler, "transform"):
            scaled_features = scaler.transform(df)
        else:
            print("⚠️ Scaler is not properly loaded!")
            return jsonify({"error": "Scaler not loaded correctly"}), 500

        # ✅ Make predictions
        prediction = model.predict(scaled_features)[0]

        # ✅ Map prediction to Dosha
        dosha_map = {
            0: "Vata",
            1: "Pitta",
            2: "Kapha",
            3: "Vata + Pitta",
            4: "Vata + Kapha",
            5: "Pitta + Kapha"
        }
        predicted_dosha = dosha_map.get(prediction, "Unknown").strip().lower()  # Normalize predicted dosha

        print(f"✅ Predicted Dosha (Normalized): {predicted_dosha}")

        # ✅ Fetch diet suggestions from CSV
        if diet_df is not None and "doshas" in diet_df.columns:
            # Normalize both sides for matching
            dosha_row = diet_df[diet_df["doshas"].str.strip().str.lower() == predicted_dosha]

            if not dosha_row.empty:
                diet_to_consume = dosha_row["diets to consume"].values[0] if "diets to consume" in diet_df.columns else "Data missing"
                diet_to_avoid = dosha_row["diets to avoid"].values[0] if "diets to avoid" in diet_df.columns else "Data missing"
                lifestyle = dosha_row["lifestyle"].values[0] if "lifestyle" in diet_df.columns else "Data missing"
            else:
                diet_to_consume, diet_to_avoid, lifestyle = "No data", "No data", "No data"
        else:
            diet_to_consume, diet_to_avoid, lifestyle = "No data", "No data", "No data"

        # ✅ Return prediction results
        return jsonify({
            "dosha": predicted_dosha,
            "suggestions": {
                "consume": diet_to_consume,
                "avoid": diet_to_avoid,
                "lifestyle": lifestyle
            }
        })

    except Exception as e:
        print(f"❌ Error in Prediction: {e}")
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
