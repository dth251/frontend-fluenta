// ========================================================
// SETTINGS PAGE LOGIC (settings.js)
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('settingsForm');
  const settingsStatus = document.getElementById('settingsStatus');
  const dataStatus = document.getElementById('dataStatus');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const time = document.getElementById('reminderTime').value;
    settingsStatus.textContent = `✓ Đã lưu. Bạn sẽ được nhắc lúc ${time} mỗi ngày.`;
  });

  document.getElementById('exportDataBtn')?.addEventListener('click', () => {
    dataStatus.textContent = 'Đang chuẩn bị gói dữ liệu .zip. Liên kết tải về sẽ được gửi tới email của bạn.';
  });

  document.getElementById('deleteDataBtn')?.addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ bản ghi và lịch sử đo lường? Hành động này không thể hoàn tác.')) {
      dataStatus.textContent = 'Đã tiếp nhận yêu cầu xóa dữ liệu. Chúng tôi sẽ xác nhận qua email trong vòng 48 giờ.';
    }
  });
});
