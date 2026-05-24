const API_KEY = "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";

const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const btn = document.getElementById("sendBtn");

btn.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

async function sendMessage() {

    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    const botDiv = addMessage("Thinking...", "bot");

    try {

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://replit.com",
                "X-Title": "PocketDev AI"
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        });

        const data = await response.json();

        console.log(data);

        if (data.error) {
            botDiv.innerText = "Error: " + data.error.message;
            return;
        }

        botDiv.innerText =
            data.choices?.[0]?.message?.content || "No response from AI.";

    } catch (err) {
        console.log(err);
        botDiv.innerText = "Network error / request failed.";
    }
}

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = type;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
}
