document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    fetch('/api/contact', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("statusMsg").textContent = "✅ Message sent to Discord!";
            document.getElementById("contactForm").reset();
        } else {
            document.getElementById("statusMsg").textContent = "❌ Failed to send message.";
        }
    })
    .catch(error => {
        document.getElementById("statusMsg").textContent = "⚠️ Error sending message.";
        console.error(error);
    });
});