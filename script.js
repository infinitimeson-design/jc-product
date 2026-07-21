// Hero parallax
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.15}px)`;
});

// Lightbox
const items = document.querySelectorAll('.grid__item');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
let current = 0;
const imgs = [...items].map(i => i.querySelector('img').src);

items.forEach((item, i) => {
  item.addEventListener('click', () => { current = i; open(); });
});

function open() {
  lbImg.src = imgs[current];
  lightbox.classList.add('active');
}
lbClose.addEventListener('click', () => lightbox.classList.remove('active'));
lbPrev.addEventListener('click', () => { current = (current - 1 + imgs.length) % imgs.length; open(); });
lbNext.addEventListener('click', () => { current = (current + 1) % imgs.length; open(); });
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('active'); });

// Keyboard nav
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') { current = (current - 1 + imgs.length) % imgs.length; open(); }
  if (e.key === 'ArrowRight') { current = (current + 1) % imgs.length; open(); }
  if (e.key === 'Escape') lightbox.classList.remove('active');
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.grid__item, .about__img, .about__text').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});
document.addEventListener('animationend', () => {});
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: none !important; }`;
document.head.appendChild(style);

// Form
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  e.target.innerHTML = '<p style="text-align:center;color:var(--gold);letter-spacing:.1em">Message sent. Thank you.</p>';
});
