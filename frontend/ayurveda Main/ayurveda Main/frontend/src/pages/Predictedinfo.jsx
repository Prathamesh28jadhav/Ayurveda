import React, { useState } from "react";

const DoshaInformation = () => {
    const [selectedDosha, setSelectedDosha] = useState(null);

    const doshas = [
        {
            name: "Vata Dosha",
            consume: [
                "Sweet, salty, and sour foods.",
                "Rice, wheat, urad dal, milk, ghee, curd, chicken, mutton, dry fruits.",
                "Warm, freshly prepared foods with fat content.",
                "Ingredients like asafoetida, cumin seeds, ginger, black salt, jaggery, and carom seeds."
            ],
            avoid: [
                "Bitter, astringent, or pungent (spicy) foods.",
                "Millets like Bajri, Nachni, Jawari, Shinghade, dry fish, etc.",
                "Foods directly from the refrigerator."
            ],
            lifestyle: [
                "Follow a consistent daily routine.",
                "Prioritize warmth and comfort.",
                "Engage in gentle exercises like yoga or walking.",
                "Practice mindfulness (meditation/journaling).",
                "Stay hydrated with warm water.",
                "Ensure adequate, restorative sleep.",
                "Use warm oil massages for relaxation."
            ],
            image: "https://i.pinimg.com/originals/00/6f/10/006f10750943f13e0b2733f4e58ec5fc.jpg"
        },
        {
            name: "Pitta Dosha",
            consume: [
                "Sweet, bitter, and astringent foods.",
                "Rice, wheat, mung bean, toor dal, amla, ghee, milk, pomegranate.",
                "Bitter ingredients like ghee, lemon, cardamom, fenugreek, and nutmeg."
            ],
            avoid: [
                "Spicy foods like chilies, pickles.",
                "Too much oily food."
            ],
            lifestyle: [
                "Maintain a consistent daily routine.",
                "Engage in gentle, grounding exercises like yoga.",
                "Avoid midday heat and stay hydrated.",
                "Practice self-massage with warm oils.",
                "Ensure restorative sleep."
            ],
            image: "https://i.pinimg.com/736x/69/54/03/6954034ad6fd167c5ded4e36a93358c1.jpg"
        },
        {
            name: "Kapha Dosha",
            consume: [
                "Bitter, pungent, and astringent foods.",
                "Mung beans, rice & wheat older than one year, barley, finger millet, sweet potatoes.",
                "Spices like ginger, cumin seeds, carom seeds, turmeric, and cloves."
            ],
            avoid: [
                "Sweets, baked goods, and cold foods."
            ],
            lifestyle: [
                "Engage in regular, invigorating exercise.",
                "Opt for a light, warming diet.",
                "Practice dynamic yoga or cardio.",
                "Incorporate herbs like ginger or turmeric.",
                "Cultivate mental stimulation through creative activities."
            ],
            image: "https://www.totalayurveda.in/wp-content/uploads/2023/11/Kapha-Dosha-1536x768.jpeg"
        },
        {
            name: "Vata + Pitta",
            consume: [
                "Favor sweet, juicy fruits",
                "Favor well-cooked or steamed veggies",
                "Favor whole grains such as basmati rice, red rice, quinoa, buckwheat, whole wheat, spelt, and oats",
                "Favor digestive spices like fresh ginger, turmeric, fennel, coriander, parsley, cardamom, and cumin"
            ],
            avoid: [
                "Avoid raw and cold foods",
                "Avoid hot, spicy foods like cayenne pepper, dry ginger, chili powder",
                "Avoid refined sugar, refined grains, processed food, additives, dyes, caffeine, alcohol, and tobacco"
            ],
            lifestyle: [
                "Maintain a balanced routine with consistent timing for meals, sleep, and activities",
                "Practice deep breathing or meditation to manage stress",
                "Stay hydrated with room temperature water",
                "Perform self-massage with cooling oils like coconut or sunflower",
                "Prioritize restful sleep"
            ],
            image: "https://i.pinimg.com/originals/00/6f/10/006f10750943f13e0b2733f4e58ec5fc.jpg"
        },
        {
            name: "Pitta + Kapha",
            consume: [
                "Lean, easy-to-digest proteins like fish, chicken, egg whites, and mung beans",
                "Fiber-rich options such as buckwheat, quinoa, and vegetables",
                "Low-sugar fruits like apples, blueberries, and cherries",
                "Ginger tea, CCF tea (cumin, coriander, fennel tea), or warm lime water"
            ],
            avoid: [
                "Heating, inflammatory foods like nightshades, red meat, pork, refined carbohydrates",
                "Avoid snacking and eating after 7pm (6pm in winter)",
                "Avoid iced and cold beverages"
            ],
            lifestyle: [
                "Engage in regular, moderate exercise like swimming or brisk walking",
                "Maintain regular meal times and avoid overeating",
                "Stay hydrated with room temperature or cool water",
                "Create a calm, peaceful environment for relaxation"
            ],
            image: "https://i.pinimg.com/originals/00/6f/10/006f10750943f13e0b2733f4e58ec5fc.jpg"
        },
        {
            name: "Vata + Kapha",
            consume: [
                "Lean proteins like fish, chicken, egg whites, and mung beans",
                "Fiber-rich options like buckwheat, quinoa, and cooked veggies",
                "Well-cooked, easy-to-digest meals like soups, stews, porridge, dal, and kitchari",
                "Digestive spices like fresh ginger, turmeric, and coriander"
            ],
            avoid: [
                "Avoid raw and cold foods",
                "Avoid eating after 7pm (6pm in winter)",
                "Avoid heavy grains like wheat, gluten, and oats",
                "Avoid refined sugar, refined grains, processed food, additives, dyes, caffeine, alcohol, and tobacco"
            ],
            lifestyle: [
                "Follow a warm, grounding routine with regular mealtimes, exercise, and relaxation",
                "Engage in gentle exercise like yoga to promote circulation",
                "Eat warm, cooked meals with digestive spices to support balanced digestion",
                "Ensure adequate, restorative sleep each night"
            ],
            image: "https://i.pinimg.com/originals/00/6f/10/006f10750943f13e0b2733f4e58ec5fc.jpg"
        }


    ];

    const handleDoshaChange = (event) => {
        const doshaName = event.target.value;
        const selected = doshas.find((dosha) => dosha.name === doshaName);
        setSelectedDosha(selected);
    };

    return (
        <div
            className="flex flex-col w-full min-h-screen p-8 bg-cover bg-center"
            style={{ backgroundImage: 'url("https://wallpapercave.com/wp/wp3429906.png")' }}
        >
            {/* Dosha Selection Dropdown */}
            <div className="w-full max-w-lg mx-auto mb-8">
                <label htmlFor="dosha" className="text-2xl font-semibold text-gray-800 mb-3 block">
                    Select Dosha
                </label>
                <select
                    id="dosha"
                    className="w-full p-3 rounded-md shadow-md border-2 border-gray-400 focus:ring focus:ring-blue-300"
                    onChange={handleDoshaChange}
                    defaultValue=""
                >
                    <option value="" disabled>
                        -- Choose a Dosha --
                    </option>
                    {doshas.map((dosha, index) => (
                        <option key={index} value={dosha.name}>
                            {dosha.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Dosha Information Content */}
            {selectedDosha ? (
                <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto bg-white bg-opacity-90 p-6 rounded-lg shadow-xl transition-all duration-300">
                    {/* Left Side: Image (Always on Left) */}
                    <div className="md:w-1/3 flex justify-center items-center p-4">
                        <img
                            src={selectedDosha.image}
                            alt={selectedDosha.name}
                            className="w-full h-auto max-h-80 object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Right Side: Dosha Details */}
                    <div className="md:w-2/3 p-6">
                        <h2 className="text-4xl font-bold mb-6 text-gray-800">{selectedDosha.name}</h2>

                        <h3 className="text-2xl font-semibold mb-4 text-blue-700">Diets to Consume:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            {selectedDosha.consume.map((item, idx) => (
                                <li key={idx} className="text-lg text-gray-700">{item}</li>
                            ))}
                        </ul>

                        <h3 className="text-2xl font-semibold mt-6 mb-4 text-red-600">Diets to Avoid:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            {selectedDosha.avoid.map((item, idx) => (
                                <li key={idx} className="text-lg text-gray-700">{item}</li>
                            ))}
                        </ul>

                        <h3 className="text-2xl font-semibold mt-6 mb-4 text-green-700">Lifestyle Recommendations:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            {selectedDosha.lifestyle.map((item, idx) => (
                                <li key={idx} className="text-lg text-gray-700">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p className="text-xl text-gray-700 text-center mt-6">
                    Please select a Dosha to see the details.
                </p>
            )}
        </div>
    );
};

export default DoshaInformation;