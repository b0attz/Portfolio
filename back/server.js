// server.js
const express = require('express');
const app = express();
app.use(express.json());

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1403579005885481110/UKnIprx4nloEb-OqRTdXyFE007L8PGzLfQ9f38Z1jHnT-6DwCAxf3xdPRgttqN4NH2Zi";

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    
    const payload = {
        content: `📩 **New Contact Form Submission**\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}`
    };

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        res.json({ success: false });
    }
});

app.listen(3000);