// ========================================================
// SPECIALIST CONNECT LOGIC (specialist-connect.js)
// ========================================================
function sendSpecialistReport(event) {
  if (event) event.preventDefault();
  const alertBox = document.getElementById('connectAlert');
  if (alertBox) {
    alertBox.hidden = false;
    alertBox.innerHTML = `
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <span>Hồ sơ mã bệnh án #FL-2026-0842 đã được gửi mã hóa an toàn tới Bác sĩ / Chuyên viên SLP chỉ định.</span>
        <div class="d-flex gap-2">
          <a href="progress.html" class="btn btn-sm btn-outline-success">Xem tiến trình</a>
          <a href="index.html" class="btn btn-sm btn-success text-white">Về tổng quan</a>
        </div>
      </div>
    `;
    alertBox.scrollIntoView({ behavior: 'smooth' });
  }
}
