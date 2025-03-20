import streamlit as st
import numpy as np
import os
import joblib
import pandas as pd
import streamlit.components.v1 as components

# Paths to model, scaler, and CSV
MODEL_PATH = os.path.join(os.getcwd(), "models", "svc_rbf_best_model.pkl")
SCALER_PATH = os.path.join(os.getcwd(), "models", "scaler_best.pkl")
SUGGESTION_CSV_PATH = os.path.join(os.getcwd(), "data", "diet.csv")


# Load model and scaler with error handling
try:
    model = joblib.load(MODEL_PATH) if os.path.exists(MODEL_PATH) else None
    scaler = joblib.load(SCALER_PATH) if os.path.exists(SCALER_PATH) else None
except Exception as e:
    st.error(f"Error loading model or scaler: {e}")
    model, scaler = None, None

# Load and preprocess CSV file for Diet & Lifestyle Suggestions
diet_df = None
if os.path.exists(SUGGESTION_CSV_PATH):
    try:
        diet_df = pd.read_csv(SUGGESTION_CSV_PATH, encoding="utf-8")
        diet_df.columns = diet_df.columns.str.strip().str.lower()

        if "doshas" in diet_df.columns:
            diet_df.rename(columns={"doshas": "dosha"}, inplace=True)
    except Exception as e:
        st.error(f"Error loading diet CSV: {e}")

# Streamlit App Header
st.title("🧘‍♂️ Tridosha Identification Bot")
st.write("Hi! I'm here to help you identify your **Dosha** type. Let's begin! 🎯")

# Dosha Features
DOSHA_FEATURES = {
    "Body Size": ["Slim", "Medium", "Large"],
    "Body Weight": ["Low", "Moderate", "Heavy"],
    "Height": ["Short", "Average", "Tall"],
    "Bone Structure": ["Light, Small bones, prominent joints", "Medium bone structure", "Large, broad shoulders, heavy bone structure"],
    "Complexion": ["Dark-Complexion, tans easily", "Fair-skin sunburns easily", "White, pale, tans easily"],
    "General Feel of Skin": ["Dry and thin, cool to touch, rough", "Smooth and warm, oily T-zone", "Thick and moist/greasy, cold"],
    "Texture of Skin": ["Dry, pigments and aging", "Freckles, many moles, redness and rashes", "Oily"],
    "Hair Color": ["Black/Brown, dull", "Red, light brown, yellow", "Brown"],
    "Appearance of Hair": ["Dry, black, knotted, brittle", "Straight, oily", "Thick, Curly"],
    "Shape of Face": ["Long, angular, thin", "Heart-shaped, pointed chin", "Large, round, full"],
    "Eyes": ["Small, active, darting, dark eyes", "Medium-sized, penetrating, light-sensitive eyes", "Big, round, beautiful, glowing eyes"],
    "Eyelashes": ["Scanty eyelashes", "Moderate eyelashes", "Thick/Fused eyelashes"],
    "Blinking of Eyes": ["Excessive Blinking", "Moderate Blinking", "More or less stable"],
    "Cheeks": ["Wrinkled, Sunken", "Smooth, Flat", "Rounded, Plump"],
    "Nose": ["Crooked, Narrow", "Pointed, Average", "Rounded, Large open nostrils"],
    "Teeth and Gums": ["Irregular, Protruding teeth, Receding gums", "Medium-sized teeth, Reddish gums", "Big, White, Strong teeth, Healthy gum"],
    "Lips": ["Tight, thin, dry lips which chaps easily", "Lips are soft, medium-sized", "Lips are large, soft, pink, and full"],
    "Nails": ["Dry, Rough, Brittle, Break", "Sharp, Flexible, Pink, Lustrous", "Thick, Oily, Smooth, Polished"],
    "Appetite": ["Irregular, Scanty", "Strong, Unbearable", "Slow but steady"],
    "Liking Tastes": ["Sweet / Sour / Salty", "Sweet / Bitter / Astringent", "Pungent / Bitter / Astringent"]
}

# Custom CSS for styling the question box
st.markdown(
    """
    <style>
        .question-box {
            background-color: white;
            border: 2px solid #ddd;
            padding: 15px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 18px;
            font-weight: bold;
            color: #333;  /* Change text color to dark gray for better readability */
        }
        .info-icon {
            width: 24px;
            height: 24px;
        }
    </style>
    """,
    unsafe_allow_html=True
)


# Clickable chatbot image (Right-Bottom Aligned)
bot_url = "http://localhost:8502"  # Change port if needed

st.markdown(
    f"""
    <style>
        .chatbot-icon {{
            position: fixed;
            bottom: 50px;
            right: 50px;
            width: 50px; /* Adjust size */
            height: 50px;
            cursor: pointer;
            z-index: 1000;
        }}
    </style>
    <a href="{bot_url}" target="_blank">
        <img src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" class="chatbot-icon">
    </a>
    """,
    unsafe_allow_html=True
)






# Initialize session state
if "chat_stage" not in st.session_state:
    st.session_state.chat_stage = 0
if "user_inputs" not in st.session_state:
    st.session_state.user_inputs = {}

questions = list(DOSHA_FEATURES.keys())
if st.session_state.chat_stage < len(questions):
    current_question = questions[st.session_state.chat_stage]
    options = DOSHA_FEATURES[current_question]

    # Display question inside a styled box with an info icon
    st.markdown(
        f"""
        <div class="question-box">
            <span>🤖 Please select your {current_question.lower()}:</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                <path d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.992 8H12.001" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        """,
        unsafe_allow_html=True
    )

    selected_option = st.radio("", options, key=f"q{st.session_state.chat_stage}")

    if st.button("Next 🚀"):
        st.session_state.user_inputs[current_question] = selected_option
        st.session_state.chat_stage += 1
        st.rerun()

elif st.session_state.chat_stage == len(questions):
    st.write("🤖 **Bot:** Thank you for your responses! Now, let me predict your Dosha...")

    try:
        input_numeric = [DOSHA_FEATURES[q].index(st.session_state.user_inputs[q]) for q in questions]
        input_array = np.array(input_numeric).reshape(1, -1)
        input_scaled = scaler.transform(input_array) if scaler else input_array
        prediction = model.predict(input_scaled) if model else None
        predicted_index = int(prediction[0]) if prediction is not None else -1

        dosha_labels = ["Vata", "Pitta", "Kapha", "Vata + Pitta", "Vata + Kapha", "Pitta + Kapha"]
        predicted_dosha = dosha_labels[predicted_index] if predicted_index != -1 else "Error in Prediction"

    except Exception as e:
        st.error(f"Prediction error: {e}")
        predicted_dosha = "Error in Prediction"

    st.success(f"🎉 **Your predicted Dosha is:** **{predicted_dosha}**! 🌿")

    if diet_df is not None and "dosha" in diet_df.columns:
        if predicted_dosha in diet_df["dosha"].values:
            dosha_row = diet_df[diet_df["dosha"] == predicted_dosha]
            diet_to_consume = dosha_row["diets to consume"].values[0] if "diets to consume" in diet_df.columns else "Data missing"
            diet_to_avoid = dosha_row["diets to avoid"].values[0] if "diets to avoid" in diet_df.columns else "Data missing"
            lifestyle = dosha_row["lifestyle"].values[0] if "lifestyle" in diet_df.columns else "Data missing"

            st.subheader(f"🌱 Recommended Diet & Lifestyle for {predicted_dosha}")
             # Display Diet to Consume in Bullet Points
            st.markdown("### 🍏 Diets to Consume:")
            for item in diet_to_consume.split(","):
                st.markdown(f"- {item.strip()}")
            # Display Diet to Avoid in Bullet Points
            st.markdown("### 🚫 Diets to Avoid:")
            for item in diet_to_avoid.split(","):
                st.markdown(f"- {item.strip()}")

            # Display Lifestyle Recommendations in Bullet Points
            st.markdown("### 🧘 Lifestyle Recommendations:")
            for item in lifestyle.split(","):
                st.markdown(f"- {item.strip()}")
        else:
            st.error("⚠️ No matching Dosha found in the CSV data.")

    if st.button("Start Again 🔄"):
        st.session_state.chat_stage = 0
        st.session_state.user_inputs = {}
        st.rerun()
