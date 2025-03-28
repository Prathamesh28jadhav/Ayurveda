import React, { useState } from "react";
import axios from "axios";
import styles from "./Questions.module.css";


const API_URL = "http://127.0.0.1:5000/predict";

// Replace DOSHA_FEATURES with the detailed QUESTIONS object containing images and descriptions
const QUESTIONS = {
    0: {
        "question": "Describe your body Size?",
        "options": {
            0: "Slim",
            1: "Medium",
            2: "Large",
        },
        "assets": {
            "images": [require("../Assets/Body Size.png")],
            "description": [
                ["Slim", "When someone is described as slim, it means they have a body shape that is thinner or narrower compared to average."],
                ["Medium", "Medium body size refers to being neither particularly thin nor particularly large."],
                ["Large", "A large body size indicates that someone has a bigger or broader physique compared to average."]
            ]
        }
    },
    1: {
        "question": "What is your body weight?",
        "options": {
            0: "Low - difficulties in gaining weight",
            1: "Moderate - no difficulties in gaining or losing weight",
            2: "Heavy - difficulties in losing weight",
        },
        "assets": {

            "description": [
                ["Low", "Struggles to gain weight despite regular diet."],
                ["Moderate", "Balanced weight, easy to maintain."],
                ["Heavy", "Tends to gain weight easily, hard to lose."]
            ]
        }
    },
    2: {
        "question": "What is your height?",
        "options": {
            0: "Short",
            1: "Average",
            2: "Tall",
        },
        "assets": {

            "description": [
                ["Short", "Below average height."],
                ["Average", "Moderate or common height."],
                ["Tall", "Above average height."]
            ]
        }
    },
    3: {
        "question": "What is your bone structure?",
        "options": {
            0: "Light, Small bones, prominent joints",
            1: "Medium bone structure",
            2: "Large, broad shoulders , heavy bone structure",
        },
        "assets": {

            "images": [require("../Assets/Bone Structure.png")],
            "description": [["Light, Small bones, prominent joints", "Individuals with light or small bones tend to have a delicate or petite skeletal structure. Their bones are thinner and less dense, and they may have more visible joints, giving them a slender appearance"],
            ["Medium bone structure", "Those with a medium bone structure have bones that are neither particularly small nor large. Their skeletal frame is typically average in size and density, resulting in a balanced physique"],
            ["Large, broad shoulders , heavy bone structure", "People with a large, heavy bone structure have thicker and denser bones, often resulting in a more robust frame. They may have broad shoulders and a sturdy build, with a greater overall body mass."]]
        }
    },
    4: {
        "question": "What is your complexion?",
        "options": {
            0: "Dark-Complexion, tans easily",
            1: "Fair-skin sunburns easily",
            2: "White, pale, tans easily",
        },
        "assets": {
            "images": [
                require("../Assets/Complexion.png"),
                require("../Assets/Complexion Option 1.png"),
                require("../Assets/Complexion Option 2.png"),
                require("../Assets/Complexion Option 3.png")
            ]
        }

    },
    5: {
        "question": "Describe the general feel of skin",
        "options": {
            0: "Dry and thin, cool to touch, rough",
            1: "Smooth and warm, oily T-zone",
            2: "Thick and moist/greasy, cold",
        },
        "assets": {

            "images": [require("../Assets/General Feel Of Skin.png")],
            "description": [
                ["Dry and thin, cool to touch, rough", "Skin that feels dry and thin lacks moisture, often feeling cool to the touch and exhibiting a rough texture. This condition may result from dehydration or a deficiency in natural oils."],
                ["Smooth and warm, oily T-zone", "Skin with a smooth and warm sensation typically indicates adequate moisture levels and healthy oil production. An oily T-zone, comprising the forehead, nose, and chin, may appear shiny due to excess oil secretion, while the rest of the skin maintains a smooth texture and warmth."],
                ["Thick and moist/greasy, cold", "Skin feeling thick, moist, or greasy suggests heightened oiliness and moisture retention. This sensation can make the skin feel cool to the touch due to the presence of moisture on the skin's surface."]
            ]
        }
    },
    6: {
        "question": "Describe the skin texture",
        "options": {
            0: "Dry, pigments and aging",
            1: "Freckles, many moles, redness and rashes",
            2: "Oily",
        },
        "assets": {
            "images": [
                require("../Assets/Skin Texture.png"),
                require("../Assets/Skin Texture Option 1.png"),
                require("../Assets/Skin Texture Option 2.png"),
                require("../Assets/Skin Texture Option 3.png")
            ]
        }

    },
    7: {
        "question": "What is your hair colour?",
        "options": {
            0: "Black/Brown,dull",
            1: "Red, light brown, yellow",
            2: "Brown",
        },
        "assets": {}
    },
    8: {
        "question": "Describe the appearance of your hair",
        "options": {
            0: "Dry, black, knotted, brittle",
            1: "Straight, oily",
            2: "Thick, curly",
        },
        "assets": {
            "images": [
                require("../Assets/Appearance of Hair.png"),
                require("../Assets/Hair Option 1.png"),
                require("../Assets/Hair Option 2.png"),
                require("../Assets/Hair Option 3.png")
            ]
        }

    },
    9: {
        "question": "Describe the shape of face",
        "options": {
            0: "Long, angular, thin",
            1: "Heart-shaped, pointed chin",
            2: "Large, round, full",
        },
        "assets": {
            "images": [
                require("../Assets/Shape of the Face.png"),
                require("../Assets/Shape of Face Option 1.png"),
                require("../Assets/Shape of the face Option 2.png"),
                require("../Assets/Shape of the Face Option 3.png")
            ]
        }

    },
    10: {
        "question": "Describe your eyes",
        "options": {
            0: "Small, active, darting, dark eyes",
            1: "Medium-sized, penetrating, light-sensitive eyes",
            2: "Big, round, beautiful, glowing eyes",
        },
        "assets": {

            "images": [require("../Assets/Eyes.png")],
            "description": [
                ["Small, active, darting, dark eyes", "These eyes are relatively small in size and exhibit a vibrant, energetic nature. They are often in constant motion, darting around to observe their surroundings. Their color is typically dark, adding depth and intensity to their gaze."],
                ["Medium-sized, penetrating, light-sensitive eyes", "These eyes are of moderate size and possess a compelling, penetrating quality. They can make a strong impression and are adept at conveying emotion. Additionally, they may be sensitive to light, requiring protection or adjustment in bright conditions."],
                ["Big, round, beautiful, glowing eyes", "Describing eyes that are large and rounded, they are considered attractive and captivating. Their size contributes to their allure, and they have a beautiful appearance that exudes radiance and vitality"]]
        }
    },
    11: {
        "question": "Describe your eyelashes",
        "options": {
            0: "Scanty eyelashes",
            1: "Moderate eyelashes",
            2: "Thick/Fused eyelashes",
        },
        "assets": {
            "images": [
                require("../Assets/Eyelashes.png"),
                require("../Assets/Eyelashes Option 1.png"),
                require("../Assets/Eyelashes Option 2.png"),
                require("../Assets/Eyelashes Option 3.png")
            ]
        }

    },
    12: {
        "question": "How often do you blink your eyes?",
        "options": {
            0: "Excessive Blinking",
            1: "Moderate Blinking",
            2: "More or less stable",
        },
        "assets": {}
    },
    13: {
        "question": "How are your cheeks?",
        "options": {
            0: "Wrinkled, Sunken",
            1: "Smooth, Flat",
            2: "Rounded, Plump",
        },
        "assets": {
            "images": [
                require("../Assets/Cheeks.png"),
                require("../Assets/Cheeks Option 1.png"),
                require("../Assets/Cheeks Option 2.png"),
                require("../Assets/Cheeks Option 3.png")
            ]
        }

    },
    14: {
        "question": "How is your nose?",
        "options": {
            0: "Crooked, Narrow",
            1: "Pointed, Average",
            2: "Rounded, Large open nostrils",
        },
        "assets": {
            "images": [
                require("../Assets/Nose.png"),
                require("../Assets/Nose Option 1.png"),
                require("../Assets/Nose Option 2.png"),
                require("../Assets/Nose Option 3.png")
            ]
        }

    },
    15: {
        "question": "Describe your teeth and gums",
        "options": {
            0: "Irregular, Protruding teeth, Receding gums",
            1: "Medium-sized teeth, Reddish gums",
            2: "Big, White, Strong teeth, Healthy gums",
        },
        "assets": {

            "images": [require("../Assets/Teeth.png")],
            "description": [
                ["Irregular, Protruding teeth, Receding gums", "Irregular teeth refer to teeth that are misaligned or unevenly spaced while protruding teeth extend outward from the gum line. Receding gums occur when the gum tissue pulls back from the teeth, exposing more of the tooth's surface and potentially leading to sensitivity and gum disease"],
                ["Medium-sized teeth, Reddish gums", "Medium-sized teeth are neither too large nor too small and typically provide adequate coverage of the gums when smiling. Reddish gums may indicate inflammation or irritation, possibly due to gum disease or poor oral hygiene."],
                ["Big, White, Strong teeth, Healthy gums", "Big teeth are larger and can provide a bold, striking appearance when combined with a bright, white color. Strong teeth are resistant to damage and decay, contributing to overall oral health and function. Healthy gums are pink in color and firm to the touch, indicating proper blood flow and minimal inflammation or infection."]]
        }
    },
    16: {
        "question": "How are your lips?",
        "options": {
            0: "Tight, thin, dry lips which chaps easily",
            1: "Lips are soft, medium-sized",
            2: "Lips are large, soft, pink, and full",
        },
        "assets": {

            "images": [require("../Assets/Lips.png")],
            "description": [
                ["Tight, thin, dry lips which chaps easily",
                    "Tight, thin lips have a slender appearance and may lack volume or fullness. Dry lips are prone to chapping or cracking, often due to dehydration or exposure to harsh weather conditions"],
                ["Lips are soft, medium-sized", "Soft lips have a smooth, supple texture and feel pliable to the touch. Medium-sized lips are proportionate to the rest of the face, neither overly thin nor excessively full."],
                ["Lips are large, soft, pink, and full", "Large lips have a more generous size and fuller appearance, providing a bold and expressive feature to the face. Soft lips retain their suppleness and smooth texture, feeling gentle and inviting. Pink lips are healthy in coloration, indicating good blood circulation and vitality."]]
        }
    },
    17: {
        "question": "How are your nails?",
        "options": {
            0: "Dry, Rough, Brittle, Break",
            1: "Sharp, Flexible, Pink, Lustrous",
            2: "Thick, Oily, Smooth, Polished",
        },
        "assets": {
            "images": [
                require("../Assets/Nails.png"),
                require("../Assets/Nails Option 1.png"),
                require("../Assets/Nails Option 2.png"),
                require("../Assets/Nails Option 3.png")
            ]
        }

    },
    18: {
        "question": "What is your appetite like?",
        "options": {
            0: "Irregular, Scanty",
            1: "Strong, Unbearable",
            2: "Slow but steady",
        },
        "assets": {

            "images": [require("../Assets/Appetite.png")],
            "description": [
                ["Irregular, Scanty", "An irregular and scanty appetite refers to an inconsistent eating pattern that lacks sufficient hunger or desire for food. Individuals with this type of appetite may experience fluctuations in their hunger levels, leading to periods of reduced food intake or loss of appetite."],
                ["Strong, Unbearable", "A strong and unbearable appetite signifies an intense and overwhelming craving for food that is difficult to ignore or resist. Individuals with this type of appetite may experience persistent feelings of hunger or insatiable cravings, often leading to overeating or binge eating behaviors."],
                ["Slow but steady", "A slow but steady appetite describes a pattern of eating that is characterized by a gradual and consistent desire for food. Individuals with this type of appetite may experience moderate hunger levels that develop gradually over time, leading to a steady intake of food without extreme fluctuations in appetite."]]
        }
    },
    19: {
        "question": "What are some of your likable tastes?",
        "options": {
            0: "Sweet / Sour / Salty",
            1: "Sweet / Bitter / Astringent",
            2: "Pungent / Bitter / Astringent",
        },
        "assets": {
            "images": [require("../Assets/Tastes.png")],

            "description": [
                ["Sweet / Sour / Salty", "Sweet tastes are sugary and delightful, like the sweetness of ripe fruits such as strawberries or the indulgence of chocolate. Sour tastes offer a tangy zest, found in foods like citrus fruits such as lemons or pickles. Salty tastes provide a savory satisfaction, as experienced in snacks like potato chips or pretzels."],
                ["Sweet / Bitter / Astringent", "Sweet flavors bring a sugary delight to dishes, like the sweetness of desserts such as cake or the comforting taste of milk chocolate. Bitter tastes offer a rich complexity, found in foods like dark chocolate or coffee, adding depth to culinary experiences. Astringent tastes leave a dry sensation in the mouth, as experienced in beverages like green tea or some fruits like unripe bananas."],
                ["Pungent / Bitter / Astringent", "Pungent tastes are bold and spicy, adding zest to dishes like onions or mustard. Bitter flavors provide a nuanced depth, found in ingredients like certain vegetables or dark chocolate, offering a sophisticated twist to culinary creations. Astringent tastes evoke a dryness in the mouth, experienced in items like pomegranate or red wine, contributing to a complex and well-rounded flavor profile."]]
        }
    },
};

const App = () => {
    const totalQuestions = Object.keys(QUESTIONS).length;

    const [features, setFeatures] = useState(Array(totalQuestions).fill(-1));  // Default value as -1
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    // ✅ Handle Change (Map Options to Numerical Values)
    const handleChange = (value) => {
        const updatedFeatures = [...features];
        updatedFeatures[currentQuestion] = parseInt(value);  // Ensure numerical mapping
        setFeatures(updatedFeatures);
    };

    // ✅ Navigation Handlers
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
    };

    const handleRedirect = () => {
        window.location.href = "http://localhost:8501";  // Change to your desired localhost
    };

    // ✅ Submit Prediction Request
    const handleSubmit = async () => {
        try {
            const payload = {
                features: features.map((value) => (value >= 0 ? value : 0))  // Handle empty selections
            };
            console.log("📤 Sending Payload:", payload);

            const response = await axios.post(API_URL, payload);

            console.log("✅ Response:", response.data);
            setResult(response.data);
            setError("");
        } catch (error) {
            console.error("❌ Error:", error);
            setError("Error during prediction. Check server logs.");
        }
    };

    // ✅ Render Question and Options
    const renderQuestionPanel = () => {
        const current = QUESTIONS[currentQuestion];
        if (features[currentQuestion] === -1) {
            const updatedFeatures = [...features];
            updatedFeatures[currentQuestion] = 0;  // Select the first option (0) by default
            setFeatures(updatedFeatures);
        }

        const handleBackToHome = () => {
            window.location.href = "/home";  // Link to home page
        };


        return (
            <div className={styles["question-box"]}>
                {/* ✅ Back to Home Button with Inline CSS (Upper Left Corner) */}
                <button
                    onClick={handleBackToHome}
                    style={{
                        position: "fixed",
                        top: "20px",
                        left: "20px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#4CAF50",   // Green color
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "background 0.3s",
                        zIndex: "1000"  // Ensure button stays on top
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#45a049"}  // Hover effect
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#4CAF50"}
                >
                    🔙 Back to Home
                </button>
                <h2>Question {currentQuestion + 1}/{totalQuestions}</h2>
                <label className={styles["label-question"]}>{current.question}</label>

                {/* ✅ Display Image if available */}
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

                {/* ✅ Display Description if available */}
                {current.assets?.description && (
                    <div className={styles["description-panel"]}>
                        {current.assets.description.map((desc, idx) => (
                            <div key={idx}>
                                <strong>{desc[0]}</strong>: {desc[1]}
                            </div>
                        ))}
                    </div>
                )}

                {/* ✅ Display Options */}
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
                        <button onClick={handleNext} className={styles["button "]}>➡️ Next</button>
                    ) : (
                        <button onClick={handleSubmit} className={styles["button"]}>🔮 Predict</button>
                    )}
                </div>

                <button className={styles["start-again"]} onClick={handleStartAgain}>
                    🔄 Start Again
                </button>

                {/* ✅ Display Prediction Results */}
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

            {/* ✅ Redirect Button at Bottom-Right */}
            <button className={styles["redirect-button"]} onClick={handleRedirect}>
                chatbot
            </button>
        </div>
    );
};





export default App;