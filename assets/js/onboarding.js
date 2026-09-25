// ========================================================
// ONBOARDING PAGE LOGIC (onboarding.js)
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  const onboardingForm = document.getElementById('onboardingForm');
  if (onboardingForm) {
    onboardingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Lưu kết quả khảo sát và chuyển sang bước Baseline Test
      window.location.href = 'baseline-test.html';
    });
  }
});
