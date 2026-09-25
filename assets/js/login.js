// ========================================================
// LOGIN PAGE LOGIC (login.js)
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Chuyển hướng vào trang Dashboard sau khi xác thực
      window.location.href = 'index.html';
    });
  }
});
