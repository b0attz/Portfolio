// Discord Webhook URL - ใส่ URL ของคุณตรงนี้
const DISCORD_WEBHOOK_URL = atob('aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTQwMzU3OTAwNTg4NTQ4MTExMC9VS25JcHJ4NG5sb0ViLU9xUlRkWHlGRTAwN0w4UEd6TGZROWYzOFoxakhuVC02RHdDQXhmM3hkUFJndHRxTjROSDJaaQ==');

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
            });
        });
    }

    // Contact Form Submission to Discord Webhook
    const contactForm = document.getElementById('contactForm');
    const statusMsg = document.getElementById('statusMsg');
    if (contactForm) {
        // เพิ่มฟีเจอร์ Enter เพื่อส่งฟอร์ม
        contactForm.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && (e.target.tagName === 'INPUT' || (e.target.tagName === 'TEXTAREA' && !e.shiftKey))) {
                e.preventDefault();
                contactForm.requestSubmit();
            }
        });

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

            function showFormError() {
                const contactSection = document.querySelector('.contact');
                if (contactSection) {
                    contactSection.classList.add('error');
                    setTimeout(() => contactSection.classList.remove('error'), 500);
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

    // Fade-in effect for each section on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => sec.classList.add('fade-in'));
    const revealOnScroll = () => {
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                sec.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});