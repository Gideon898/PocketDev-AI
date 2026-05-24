const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

async function sendMessage() {

    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    userInput.value = "";

    const botDiv = addMessage("Thinking...", "bot");

    try {

        const response = await fetch("https://pocketdev-ai.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        botDiv.innerText =
            data.choices?.[0]?.message?.content ||
            data.error ||
            "No response from AI.";

    } catch (err) {
        console.log(err);
        botDiv.innerText = "Server error.";
    }
}

function addMessage(text, type) {
    const div = document.createElement("div");
    div.classList.add("message", type);
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
}
