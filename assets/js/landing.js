// ========================================================
// LANDING PAGE LOGIC (landing.js)
// Hỏi đáp dùng <details> gốc của trình duyệt nên không cần JS.
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Cuộn tới section và chuyển focus để người dùng bàn phím/trình đọc màn hình theo kịp
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      history.replaceState(null, '', anchor.getAttribute('href'));
    });
  });
});
