'use strict';

const header = document.getElementById('siteHeader');
const backToTop = document.getElementById('backToTop');
const navbar = document.getElementById('navbarContent');

function updateScrollState() {
  const scrolled = window.scrollY > 40;
  header.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('#navbarContent a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (navbar.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(navbar).hide();
  });
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.getElementById('enquiryForm').addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  document.getElementById('formSuccess').classList.remove('d-none');
});

const galleryImages = [
  'assets/images/hero-broaches.jpg', 'assets/images/broaching-machine.jpg',
  'assets/images/factory.jpg', 'assets/images/precision-machining.jpg',
  'assets/images/hero-broaches.jpg'
];
const lightbox = document.getElementById('galleryLightbox');
const lightboxImage = document.getElementById('lightboxImage');
let galleryIndex = 0;
function showImage(index) {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[galleryIndex];
}
function openLightbox(index) {
  showImage(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.querySelectorAll('[data-gallery-open]').forEach((button) => button.addEventListener('click', () => openLightbox(Number(button.dataset.galleryOpen))));
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', () => showImage(galleryIndex - 1));
document.querySelector('.lightbox-next').addEventListener('click', () => showImage(galleryIndex + 1));
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showImage(galleryIndex - 1);
  if (event.key === 'ArrowRight') showImage(galleryIndex + 1);
});
