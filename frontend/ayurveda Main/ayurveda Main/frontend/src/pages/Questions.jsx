import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import styles from "./Questions.module.css";

// Use the live Render backend URL
const API_URL = "https://ayurveda-flask-chatbot.onrender.com/predict";

const QUESTIONS = {
    // Your QUESTIONS object remains unchanged; it’s perfect as is
    0: {
        question: "Describe your body Size?",
        options: { 0: "Slim", 1: "Medium", 2: "Large" },
        assets: {
            images: [require("../Assets/Body Size.png")],
            description: [
                ["Slim", "When someone is described as slim, it means they have a body shape that is thinner or narrower compared to average."],
                ["Medium", "Medium body size refers to being neither particularly thin nor particularly large."],
                ["Large", "A large body size indicates that someone has a bigger or broader physique compared to average."]
            ]
        }
    },
    // ... (rest of your QUESTIONS object)
    19: {
        question: "What are some of your likable tastes?",
        options: { 0: "Sweet / Sour / Salty", 1: "Sweet / Bitter / Astringent", 2: "Pungent / Bitter / Astringent" },
        assets: {
            images: [require("../Assets/Tastes.png")],
            description: [
                ["Sweet / Sour / Salty", "Sweet tastes are sugary and delightful..."],
                ["Sweet / Bitter / Astringent", "Sweet flavors bring a sugary delight..."],
                ["Pungent / Bitter / Astringent", "Pungent tastes are bold and spicy..."]
            ]
        }
    }
};

const Questions = () => { // Renamed to match file convention
    const totalQuestions = Object.keys(QUESTIONS).length;
    const navigate = useNavigate(); // For redirecting to Predictinfo

    const [features, setFeatures] = useState(Array(totalQuestions).fill(-1));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleChange = (value) => {
        const updatedFeatures = [...features];
        updatedFeatures[currentQuestion] = parseInt(value);
        setFeatures(updatedFeatures);
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleStartAgain = () => {
        setFeatures(Array(totalQuestions).fill(-1));
        setCurrentQuestion(0);
        setResult(null);
        setError("");
    };

    const handleRedirect = () => {
        navigate("/chatbot"); // Redirect to Chatbot page
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                features: features.map((value) => (value >= 0 ? value : 0)) // Default to 0 if unanswered
            };
            console.log("📤 Sending Payload:", payload);

            const response = await axios.post(API_URL, payload);
            console.log("✅ Response:", response.data);
            setResult(response.data);

            // Navigate to Predictinfo with the result
            navigate("/predictinfo", { state: { prediction: response.data } });
        } catch (error) {
            console.error("❌ Error:", error);
            setError("Error during prediction. Please try again.");
        }
    };

    const renderQuestionPanel = () => {
        const current = QUESTIONS[currentQuestion];
        if (features[currentQuestion] === -1) {
            const updatedFeatures = [...features];
            updatedFeatures[currentQuestion] = 0; // Default to first option
            setFeatures(updatedFeatures);
        }

        const handleBackToHome = () => {
            navigate("/home");
        };

        return (
            <div className={styles["question-box"]}>
                <button
                    onClick={handleBackToHome}
                    style={{
                        position: "fixed",
                        top: "20px",
                        left: "20px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "background 0.3s",
                        zIndex: "1000"
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                >
                    🔙 Back to Home
                </button>
                <h2>Question {currentQuestion + 1}/{totalQuestions}</h2>
                <label className={styles["label-question"]}>{current.question}</label>

                {current.assets?.images && (
                    <div className={styles["image-container"]}>
                        {current.assets.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Question ${currentQuestion}`}
                                className={styles["question-image"]}
                            />
                        ))}
                    </div>
                )}

                {current.assets?.description && (
                    <div className={styles["description-panel"]}>
                        {current.assets.description.map((desc, idx) => (
                            <div key={idx}>
                                <strong>{desc[0]}</strong>: {desc[1]}
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles["options-container"]}>
                    {Object.keys(current.options).map((key) => (
                        <div key={key}>
                            <input
                                type="radio"
                                name="option"
                                value={key}
                                checked={features[currentQuestion] === parseInt(key)}
                                onChange={() => handleChange(key)}
                            />
                            <label>{current.options[key]}</label>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className={styles["container"]}>
            <div className={styles["card"]}>
                <h1 className={styles["title"]}>🧘‍♂️ Tridosha Identification</h1>

                {renderQuestionPanel()}

                <div className={styles["btn-container"]}>
                    <button onClick={handlePrevious} disabled={currentQuestion === 0} className={styles["button"]}>
                        ⬅️ Previous
                    </button>
                    {currentQuestion < totalQuestions - 1 ? (
                        <button onClick={handleNext} className={styles["button"]}>➡️ Next</button>
                    ) : (
                        <button onClick={handleSubmit} className={styles["button"]}>🔮 Predict</button>
                    )}
                </div>

                <button className={styles["start-again"]} onClick={handleStartAgain}>
                    🔄 Start Again
                </button>

                {result && (
                    <div className={styles["result"]}>
                        <h2>🌿 Dosha: {result.dosha}</h2>
                        <p>🍏 Diet to Consume: {result.suggestions?.consume || "N/A"}</p>
                        <p>🚫 Diet to Avoid: {result.suggestions?.avoid || "N/A"}</p>
                        <p>🧘 Lifestyle: {result.suggestions?.lifestyle || "N/A"}</p>
                    </div>
                )}

                {error && <div className={styles["error"]}>{error}</div>}
            </div>

            <button className={styles["redirect-button"]} onClick={handleRedirect}>
                Chatbot
            </button>
        </div>
    );
};

export default Questions; // Export as Questions to match file name