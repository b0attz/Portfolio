document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const webhookURL = "https://discord.com/api/webhooks/1403579005885481110/UKnIprx4nloEb-OqRTdXyFE007L8PGzLfQ9f38Z1jHnT-6DwCAxf3xdPRgttqN4NH2Zi"; // ใส่ Webhook ของ Boatty

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const payload = {
        content: `📩 **New Contact Form Submission**
**Name:** ${name}
**Email:** ${email}
**Message:** ${message}`
    };

    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
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