// Discord Webhook URL - ใส่ URL ของคุณตรงนี้
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1403579005885481110/UKnIprx4nloEb-OqRTdXyFE007L8PGzLfQ9f38Z1jHnT-6DwCAxf3xdPRgttqN4NH2Zi";

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            navLinks.classList.toggle('collapsed');
        });

        // Close mobile menu when clicking on a link
        const navLinkItems = document.querySelectorAll('.nav-links a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                if (window.innerWidth <= 768) {
                    navLinks.classList.add('collapsed');
                }
            });
        });
    }

    // Contact Form Submission to Discord Webhook
    const contactForm = document.getElementById('contactForm');
    const statusMsg = document.getElementById('statusMsg');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const message = document.getElementById('message')?.value || '';

            // Prepare the payload for Discord
            const now = new Date();
            const timestamp = now.toLocaleString('th-TH', { hour12: false });
            const payload = {
                username: `Portfolio | bot ${Math.floor(Math.random() * 10000)}`,
                avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
                content: `**New Contact Form Submission**\n**Time:** ${timestamp}\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}\n\u200B`
            };

            function showStatus(msg, color) {
                if (statusMsg) {
                    statusMsg.innerHTML = `<span style="color:${color}">${msg}</span>`;
                    statusMsg.classList.add('show');
                    setTimeout(() => {
                        statusMsg.classList.remove('show');
                        statusMsg.innerHTML = '';
                    }, 5000);
                }
            }

            try {
                const response = await fetch(DISCORD_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    showStatus('Your message has been sent!', 'green');
                    contactForm.reset();
                } else {
                    showStatus('There was an error sending your message.', 'red');
                }
            } catch (error) {
                showStatus('There was an error sending your message.', 'red');
            }
        });
    }
});