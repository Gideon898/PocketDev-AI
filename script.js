const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        sendMessage();
    }
});

async function sendMessage(){

    const message = userInput.value.trim();

    if(!message) return;

    addMessage(message, "user");

    userInput.value = "";

    const thinkingMessage = addMessage(
        "Thinking...",
        "bot"
    );

    try{

     const response = await fetch(
    "https://pocketdev-ai.onrender.com/chat",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message
        })
    }
);

        const data = await response.json();

        console.log(data);

        thinkingMessage.innerText =
            data.choices?.[0]?.message?.content
            || "No response from AI.";

    }

    catch(error){

        console.log(error);

        thinkingMessage.innerText =
            "Server error.";
    }
}

function addMessage(text, sender){

    const div = document.createElement("div");

    div.classList.add("message");
    div.classList.add(sender);

    div.innerText = text;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

    return div;
}
