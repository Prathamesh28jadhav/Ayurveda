import streamlit as st
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get Gemini API key
api_key = os.getenv("GEMINI_API_KEY")

if api_key is None:
    st.error("API key not found! Make sure you have a valid .env file.")
else:
    genai.configure(api_key=api_key)  # Initialize Gemini API

# Set Streamlit UI
st.set_page_config(page_title="Gemini Chatbot", page_icon="💬", layout="centered")

# Custom CSS for better UI and visible text
st.markdown("""
    <style>
        .stChatMessage { 
            border-radius: 10px;
            padding: 10px;
            margin: 5px 0;
            font-size: 16px;
        }
        .user-message {
            background-color: #DCF8C6;
            text-align: right;
            color: black;
            padding: 10px;
            border-radius: 10px;
        }
        .bot-message {
            background-color: #E8E8E8;
            color: black;
            padding: 10px;
            border-radius: 10px;
        }
    </style>
""", unsafe_allow_html=True)

# Title
st.title("💬  Chatbot")
st.markdown("### 🚀 Chat with AI")

# Store chat history

if "messages" not in st.session_state:
    st.session_state["messages"] = []
    # Add the initial greeting message from the chatbot
    st.session_state["messages"].append({"role": "assistant", "content": "How can I help you?"})

# Display chat history with proper formatting
for message in st.session_state["messages"]:
    with st.chat_message(message["role"]):
        if message["role"] == "user":
            st.markdown(f'<div class="stChatMessage user-message">{message["content"]}</div>', unsafe_allow_html=True)
        else:
            st.markdown(f'<div class="stChatMessage bot-message">{message["content"]}</div>', unsafe_allow_html=True)

# User input field
user_input = st.chat_input("Type your message...")

if user_input:
    # Append user message to chat history
    st.session_state["messages"].append({"role": "user", "content": user_input})

    # Generate AI response
    model = genai.GenerativeModel("gemini-1.5-pro")
    response = model.generate_content(user_input)
    bot_reply = response.text

    # Append bot response to chat history
    st.session_state["messages"].append({"role": "assistant", "content": bot_reply})

    # Display user and bot messages
    with st.chat_message("user"):
        st.markdown(f'<div class="stChatMessage user-message">{user_input}</div>', unsafe_allow_html=True)

    with st.chat_message("assistant"):
        st.markdown(f'<div class="stChatMessage bot-message">{bot_reply}</div>', unsafe_allow_html=True)
