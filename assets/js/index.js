// ========================================================
// DASHBOARD INDEX LOGIC (index.js)
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  // Lời chào theo giờ trong ngày
  const greetingEl = document.getElementById('dashboardGreeting');
  if (greetingEl) {
    const hour = new Date().getHours();
    const period = hour < 11 ? 'Chào buổi sáng' : hour < 14 ? 'Chào buổi trưa' : hour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';
    greetingEl.textContent = `${period}, Minh`;
  }
});
