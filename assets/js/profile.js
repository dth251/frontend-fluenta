// ========================================================
// PROFILE PAGE LOGIC (profile.js)
// ========================================================
function handleProfileUpdate(e) {
  e.preventDefault();
  alert('Đã cập nhật thông tin hồ sơ học viên thành công!');
}

function exportAudioZip() {
  alert('Đang trích xuất toàn bộ dữ liệu lịch sử âm học dạng gói nén ZIP...');
}

function requestDataDeletion() {
  if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử đo lường? Hành động này không thể hoàn tác.')) {
    alert('Đã tiếp nhận yêu cầu xóa dữ liệu theo tiêu chuẩn HIPAA.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', handleProfileUpdate);
  }
});
