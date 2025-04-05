# 🌿 Prakriti Identification using ML

Machine Learning (ML) is transforming Ayurveda by automating **Prakriti** (body constitution) identification through data-driven models. *Prasna Pariksha*, a traditional assessment method, evaluates the **Tridosha**—**Vata (V)**, **Pitta (P)**, and **Kapha (K)**—based on 20 distinct criteria.

In this project, we enhance the model by incorporating additional user inputs such as water intake, exercise, and sleep patterns to provide **personalized health and lifestyle suggestions**. The app also features a **chat page** where users can share thoughts and images, promoting a collaborative wellness community. We also implemented **2-step OTP verification** to enhance user authentication and security.

The application is developed using:
- **React.js** for the frontend  
- **Node.js** for backend API handling  
- **MongoDB** for database management  
- **Python + Flask** for data training and analysis

Together, they create a seamless user experience with **real-time predictions**, supporting both Ayurvedic practitioners and individuals in making **informed wellness decisions**.

---

## 🚀 Tech Stack

![React](https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Jupyter](https://img.shields.io/badge/Jupyter%20Notebook-F37626?style=for-the-badge&logo=jupyter&logoColor=white)

---

## 🧪 Installation & Setup Guide

### 🔁 Clone the Repository

```bash
git clone https://github.com/surajbarate/Prakriti-Identification-using-ML.git
cd Prakriti-Identification-using-ML
```

---

### ⚙️ Backend Setup (Python)

```bash
cd chatbot
python -m venv myenv
```

- **Activate the environment**  
  - On Windows:
    ```bash
    myenv\Scripts\activate
    ```
  - On macOS/Linux:
    ```bash
    source myenv/bin/activate
    ```

- **Install dependencies**
  ```bash
  pip install -r requirements.txt
  ```

- **Run the backend**
  ```bash
  python app.py
  ```

---

### 💻 Frontend Setup (React.js)

> Open a new terminal:

```bash
cd frontend/"ayurveda Main"/"ayurveda Main"/frontend
npm install
npm start
```

---

> In the previous terminal (optional if full-stack communication needed):

```bash
cd frontend/"ayurveda Main"/"ayurveda Main"/backend
npm install
npm start
```

---

📆 Your project is now running successfully!

---

## 📂 Environment Variables

### 🔐 Backend `.env`
> Location: `frontend/"ayurveda Main"/"ayurveda Main"/backend`

```env
REACT_APP_YOUTUBE=
REACT_APP_GEMINI_API_KEY=
```

### 🔐 Frontend `.env`
> Location: `frontend/"ayurveda Main"/"ayurveda Main"/frontend`

```env
MONGO_URI=mongodb://localhost:27017/ayurvedicDB

JWT_SECRET=
PORT=5000
EMAIL_USER=
EMAIL_PASS=
EMAIL_SERVICE=gmail
EMAIL_PORT=465
EMAIL_HOST=smtp.gmail.com
```

---

## 📜 Keywords

**Machine Learning**, **Prakriti Identification**, **Ayurveda**, **Tridosha**, **Prasna Pariksha**, **Healthcare Automation**, **Wellness Suggestions**, **Community Chat**, **OTP Verification**

---

