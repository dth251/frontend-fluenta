// ========================================================
// BASELINE TEST LOGIC (baseline-test.js)
// ========================================================
let baselineRecording = false;

function toggleBaselineRecord() {
  baselineRecording = !baselineRecording;
  const btn = document.getElementById('baselineBtn');
  const status = document.getElementById('baselineStatus');
  if (!btn) return;

  btn.classList.toggle('recording', baselineRecording);
  if (baselineRecording) {
    btn.textContent = 'DỪNG & LƯU MẪU ĐÁNH GIÁ';
    if (status) status.textContent = 'Trạng thái: Đang ghi nhận đoạn văn đánh giá mốc ban đầu...';
  } else {
    btn.textContent = 'ĐANG THIẾT LẬP HỒ SƠ...';
    if (status) status.textContent = 'Trạng thái: Đã lưu mốc tham chiếu (%SS = 19.0%). Đang chuyển tiếp...';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 900);
  }
}
