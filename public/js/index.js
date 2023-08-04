
document.getElementById("chat-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const user = document.getElementById("user-input").value;
    const message = document.getElementById("message-input").value;
  
    
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user, message })
    });
  
    if (response.ok) {
      document.getElementById("message-input").value = "";
    }
  });
  