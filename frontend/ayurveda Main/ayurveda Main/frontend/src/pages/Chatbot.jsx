import React, { useState, useEffect, useRef } from "react";
import { Send, Mic, Moon, Sun } from "lucide-react";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [typing, setTyping] = useState(false);
    const chatEndRef = useRef(null);
    const recognition = useRef(null);

    useEffect(() => {
        if ("webkitSpeechRecognition" in window) {
            recognition.current = new window.webkitSpeechRecognition();
            recognition.current.continuous = false;
            recognition.current.interimResults = false;
            recognition.current.lang = "en-US";

            recognition.current.onresult = (event) => {
                setInput(event.results[0][0].transcript);
            };

            recognition.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    // 🔹 Fetch Response from Gemini API
    const fetchBotResponse = async (userMessage) => {
        try {
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: userMessage }] }]
                })
            });

            const data = await response.json();
            console.log("API Response:", data);  // Debugging

            if (data && data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                return data.candidates[0].content.parts[0].text;
            } else {
                return "I'm sorry, I couldn't process that request.";
            }
        } catch (error) {
            console.error("Error fetching response:", error);
            return "Error: Unable to fetch response.";
        }
    };

    // 🔹 Handle Sending Messages
    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setTyping(true);

        const botReply = await fetchBotResponse(input);
        const botResponse = { text: botReply, sender: "bot" };
        setMessages((prev) => [...prev, botResponse]);
        setTyping(false);
        speak(botReply);
    };

    // 🔹 Handle Voice Input
    const handleVoiceInput = () => {
        if (recognition.current) {
            if (!isListening) {
                setIsListening(true);
                recognition.current.start();
            } else {
                recognition.current.stop();
                setIsListening(false);
            }
        }
    };

    // 🔹 Text-to-Speech
    const speak = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        window.speechSynthesis.speak(speech);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className={`flex justify-center items-center h-screen transition-all duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <div className="w-full max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                {/* Header */}
                <div className="p-4 text-lg font-semibold flex justify-between items-center bg-blue-500 text-white">
                    <span>AI Chatbot</span>
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>

                {/* Chat Container */}
                <div className="flex flex-col space-y-2 p-4 h-96 overflow-y-auto bg-gray-100 dark:bg-gray-700">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-lg max-w-[75%] ${msg.sender === "user" ? "ml-auto bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white"}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    {typing && <div className="text-gray-500">AI is typing...</div>}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 flex items-center border-t bg-gray-50 dark:bg-gray-800">
                    <input
                        type="text"
                        className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={handleVoiceInput}
                        className={`p-3 text-white transition-all duration-300 ${isListening ? "bg-red-500" : "bg-gray-500 hover:bg-gray-600"} rounded-none`}
                    >
                        <Mic className="w-5 h-5" />
                    </button>
                    <button onClick={handleSend} className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg">
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
