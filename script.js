// Scale iframe previews to fill their containers
function scaleIframePreviews() {
  document.querySelectorAll('.card-preview').forEach((preview) => {
    const iframe = preview.querySelector('iframe');
    if (!iframe) return;
    const containerW = preview.getBoundingClientRect().width;
    const containerH = preview.getBoundingClientRect().height;
    const scale = containerW / 1280;
    iframe.style.width = '1280px';
    iframe.style.height = Math.ceil(containerH / scale) + 'px';
    iframe.style.transform = `scale(${scale})`;
    iframe.style.transformOrigin = 'top left';
  });
}

window.addEventListener('load', scaleIframePreviews);
window.addEventListener('resize', scaleIframePreviews);

// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.1 }
);

document.querySelectorAll('.project-card, .about-inner, .contact').forEach((el) => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => navObserver.observe(s));
