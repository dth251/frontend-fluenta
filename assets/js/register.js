// ========================================================
// REGISTER PAGE LOGIC (register.js)
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Chuyển hướng sang quy trình Onboarding
      window.location.href = 'onboarding.html';
    });
  }
});
