import joblib
import numpy as np

# Load the trained LinearSVC model and the scaler
try:
    model = joblib.load(r'D:\mini project\sem VI\project\bot\models\svc_rbf_best_model.pkl')
    scaler = joblib.load(r'D:\mini project\sem VI\project\bot\models\scaler_best.pkl')
    print("Model and scaler loaded successfully!")
except Exception as e:
    print(f"Error loading model or scaler: {e}")

# Display model type
print(f"Loaded model type: {type(model)}")

# Define the target labels
target = ["Vata", "Pitta", "Kapha", "Vata + Pitta", "Vata + Kapha", "Pitta + Kapha"]

# Input features for prediction (adjust input according to the trained model's feature set)
input_data = np.array([[2, 2, 1, 2, 2, 1, 1, 0, 0, 2, 2, 1, 1, 2, 2, 2, 2, 1, 2, 0]])

# Verify input shape matches model's expected input size
print(f"Input data shape: {input_data.shape}")

# Scale the input data using the same scaler used during training
input_data_scaled = scaler.transform(input_data)  # Use transform here instead of fit_transform

# Get model prediction
res = model.predict(input_data_scaled)

# Convert the result to an integer index
predicted_dosha_index = int(res[0])  # Convert to integer if necessary

# Get predicted Dosha name
predicted_dosha = target[predicted_dosha_index]  # Use the integer index to access the target list

# Print index and name
print(f"Predicted Dosha Index: {predicted_dosha_index}")
print(f"Predicted Dosha Name: {predicted_dosha}")
