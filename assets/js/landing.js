// ========================================================
// LANDING PAGE LOGIC (landing.js)
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. Interactive FAQ Accordion
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = body.style.display === 'block';

      // Đóng tất cả các FAQ khác
      document.querySelectorAll('.faq-body').forEach(b => b.style.display = 'none');
      document.querySelectorAll('.faq-toggle-state').forEach(s => s.textContent = '[+]');

      if (!isOpen) {
        body.style.display = 'block';
        const indicator = header.querySelector('.faq-toggle-state');
        if (indicator) indicator.textContent = '[-]';
      }
    });
  });
});
