// filepath: d:\mini project\AI project\chatbot\static\chatbot.js
document.addEventListener("DOMContentLoaded", function () {
    const svgElement = document.querySelector(".question-box svg");
    const chatbotPanel = document.getElementById("chatbot-panel");
    const closePanelBtn = document.getElementById("close-panel");

    svgElement.addEventListener("click", function () {
        chatbotPanel.style.display = "block";
    });

    closePanelBtn.addEventListener("click", function () {
        chatbotPanel.style.display = "none";
    });
});