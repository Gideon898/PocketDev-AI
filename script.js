const API_KEY = "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";

const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const btn = document.getElementById("sendBtn");

btn.addEventListener("click", sendMessage);
hi
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
