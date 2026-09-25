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
  btn.setAttribute('aria-pressed', String(baselineRecording));
  if (baselineRecording) {
    btn.textContent = 'Dừng & lưu mẫu đánh giá';
    if (status) status.textContent = 'Trạng thái: Đang ghi nhận đoạn văn đánh giá mốc ban đầu...';
  } else {
    btn.textContent = 'Đang thiết lập hồ sơ...';
    if (status) status.textContent = 'Trạng thái: Đã lưu mốc tham chiếu (%SS = 19.0%). Đang chuyển tiếp...';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 900);
  }
}
