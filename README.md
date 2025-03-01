Project Overview
This project integrates an AI-powered Chatbot built with Python (Streamlit), a backend API built with Node.js (Express), and a frontend built with React.js and TailwindCSS. It provides users with Ayurvedic recommendations and advice.

Prerequisites
Ensure you have the following installed on your system:

Python (Version 3.8 or higher)
Node.js (Version 16 or higher) and npm (Node Package Manager)
React.js (using create-react-app)
Git (for cloning the repository)
A package manager like pip for Python and npm/yarn for Node.js.
Installation Guide
1. Clone the Repository
git clone https://github.com/your-username/ayurveda-project.git

2. Setup Python Chatbot (Streamlit)
Navigate to the chatbot folder:
Create and activate a virtual environment:
python -m venv venv
venv\Scripts\activate

Install the required Python packages:
pip install -r requirements.txt
Run the Streamlit chatbot:

streamlit run app.py
3. Setup Backend (Node.js and Express)
Install Node.js dependencies:
npm install
Configure environment variables:

Create a .env file in the backend folder.
Add your configurations (e.g., database connection strings, API keys).
Start the backend server:

npm start


4. Setup Frontend (React and TailwindCSS)

Install dependencies:
npm install
Start the React app:
npm start
