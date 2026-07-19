// فایل js/services.js

document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const originalText = card.querySelector('.service-desc').textContent;
        const hoverText = card.getAttribute('data-description');

        card.addEventListener('mouseenter', () => {
            card.querySelector('.service-desc').textContent = hoverText;
        });

        card.addEventListener('mouseleave', () => {
            card.querySelector('.service-desc').textContent = originalText;
        });
    });
});
