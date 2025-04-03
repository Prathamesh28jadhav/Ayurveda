import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { BeatLoader } from "react-spinners";
import { predictRecommendations } from "../mlModel"; // Import ML model function

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GeneratePage() {
    const [answers, setAnswers] = useState({
        water: "",
        exercise: "",
        herbalIntake: "",
        junkFood: "",
        sleep: "",
        meditation: "",
        stress: "",
    });

    const [showGraph, setShowGraph] = useState(false);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnswers({ ...answers, [name]: parseFloat(value) || 0 });
    };

    const handleGenerate = async () => {
        if (!Object.values(answers).every((val) => val >= 0)) {
            alert("Please enter valid inputs. All values must be non-negative numbers.");
            return;
        }

        setLoading(true);
        setRecommendations([]);
        setShowGraph(false);

        const userInput = [
            answers.water || 0,
            answers.exercise || 0,
            answers.herbalIntake || 0,
            answers.junkFood || 0,
            answers.sleep || 0,
            answers.meditation || 0,
            answers.stress || 0,
        ];

        try {
            const response = await predictRecommendations(userInput);
            setRecommendations(response);
        } catch (error) {
            console.error("Error generating recommendations:", error);
            setRecommendations(["Failed to generate recommendations."]);
        }

        setLoading(false);
        setShowGraph(true);
    };

    const data = {
        labels: [
            "Water Intake",
            "Exercise",
            "Herbal Intake",
            "Junk Food",
            "Sleep",
            "Meditation",
            "Stress Level",
        ],
        datasets: [
            {
                label: "Your Progress",
                data: [
                    answers.water || 0,
                    answers.exercise || 0,
                    answers.herbalIntake || 0,
                    answers.junkFood || 0,
                    answers.sleep || 0,
                    answers.meditation || 0,
                    answers.stress || 0,
                ],
                backgroundColor: [
                    "#36A2EB",
                    "#4BC0C0",
                    "#FFCD56",
                    "#FF6384",
                    "#9966FF",
                    "#FF9F40",
                    "#C9CBCF",
                ],
                hoverOffset: 10,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        layout: {
            padding: 10,
        },
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };

    return (
        <div className="p-8 max-w-6xl mx-auto bg-gradient-to-r from-blue-200 to-indigo-400 rounded-xl shadow-lg">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                Ayurvedic Progress Tracker
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[{ key: "water", label: "Water Intake (Liters/Day)" },
                { key: "exercise", label: "Exercise (Hours/Day)" },
                { key: "herbalIntake", label: "Herbal Intake (Units/Day)" },
                { key: "junkFood", label: "Junk Food (Meals/Day)" },
                { key: "sleep", label: "Sleep (Hours/Day)" },
                { key: "meditation", label: "Meditation (Days)" },
                { key: "stress", label: "Stress Level (1-5)" },
                ].map(({ key, label }) => (
                    <div key={key} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
                        <label className="block text-lg font-medium text-gray-700 mb-2">{label}</label>
                        <input
                            type="number"
                            name={key}
                            value={answers[key]}
                            onChange={handleInputChange}
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter ${label}`}
                            min="0"
                            max="50"
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={handleGenerate}
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                disabled={loading}
            >
                {loading ? <BeatLoader size={10} color="#fff" /> : "Generate Recommendations"}
            </button>

            {loading && <p className="text-center text-gray-500 mt-6">Processing recommendations...</p>}

            {showGraph && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-center mb-6">
                        <div style={{ width: "400px", height: "400px" }}>
                            <Pie data={data} options={options} />
                        </div>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Personalized Recommendations</h2>
                        <ul className="space-y-4">
                            {recommendations.map((rec, index) => (
                                <li key={index} className="bg-blue-50 p-4 rounded-md shadow-sm text-gray-700">
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
