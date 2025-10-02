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

// Lightbox / project image modal
(() => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    let lastFocused = null;

    if (!lightbox || !lightboxImg) return;

    function openLightbox(src, title, alt, triggerEl) {
        lastFocused = triggerEl || document.activeElement;
        lightboxImg.src = src;
        lightboxImg.alt = alt || title || 'Project image';
        lightboxTitle.textContent = title || '';
        // show modal and lock background scroll
        document.body.classList.add('no-scroll');
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        // wait until image has rendered before focusing close button
        const tryFocusClose = () => {
            if (lightboxClose) lightboxClose.focus();
        };
        if (lightboxImg.complete) tryFocusClose();
        else lightboxImg.onload = tryFocusClose;
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
        lightboxTitle.textContent = '';
        document.body.classList.remove('no-scroll');
        // return focus
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    // Open when clicking a project card
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // find image inside the card
            const img = card.querySelector('img');
            const titleEl = card.querySelector('h3');
            if (!img) return;
            openLightbox(img.src, titleEl?.textContent?.trim() || '', img.alt || '', card);
        });
    });

    // Close handlers (only attach if elements exist)
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

    // Keyboard handling: Escape to close, Tab trap inside modal when open
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            e.preventDefault();
            closeLightbox();
            return;
        }

        if (e.key === 'Tab' && lightbox.classList.contains('open')) {
            // Simple focus trap: keep focus within the close button and the content
            const focusable = [];
            if (lightboxClose) focusable.push(lightboxClose);
            if (lightboxImg) focusable.push(lightboxImg);
            // default to cycling between available focusable elements
            if (focusable.length === 0) return;

            const current = document.activeElement;
            const idx = focusable.indexOf(current);
            if (e.shiftKey) {
                // shift+tab
                const next = idx > 0 ? focusable[idx - 1] : focusable[focusable.length - 1];
                e.preventDefault();
                next.focus();
            } else {
                // tab
                const next = idx >= 0 && idx < focusable.length - 1 ? focusable[idx + 1] : focusable[0];
                e.preventDefault();
                next.focus();
            }
        }
    });
})();