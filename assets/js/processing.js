// ========================================================
// PROCESSING SIMULATION LOGIC (processing.js)
// Cập nhật thanh tiến độ (role=progressbar) và vùng aria-live cho trình đọc màn hình.
// ========================================================
const STAGES = {
  20: ['Tầng 1: Tiền xử lý & bóc tách phổ âm học (wav2vec2)', 'Khử nhiễu nền, bóc tách đặc trưng âm thanh và chia khung thời gian...'],
  60: ['Tầng 1: Nhận diện sự kiện nói lắp (StutterNet model)', 'Phát hiện tọa độ Block, Lặp âm, Kéo dài âm (%SS = 12.0%)...'],
  80: ['Tầng 2: LLM Guidance & tổng hợp hướng dẫn trị liệu', 'Khởi tạo phác đồ can thiệp cá nhân hóa theo chuẩn lâm sàng ASHA...'],
  100: ['Hoàn thành: dữ liệu đã sẵn sàng', 'Đang mở trang kết quả...']
};

function simulateProcessing() {
  const bar = document.getElementById('progressBar');
  const progressEl = document.getElementById('processingProgress');
  const stageEl = document.getElementById('processingStage');
  const detailEl = document.getElementById('processingDetail');
  const liveEl = document.getElementById('processingLive');
  if (!bar) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += 20;
    bar.style.width = progress + '%';
    progressEl?.setAttribute('aria-valuenow', String(progress));

    const stage = STAGES[progress];
    if (stage) {
      if (stageEl) stageEl.textContent = stage[0];
      if (detailEl) detailEl.textContent = stage[1];
      // Chỉ thông báo khi đổi giai đoạn, tránh đọc liên tục
      if (liveEl) liveEl.textContent = `${stage[0]}. Đã xong ${progress}%.`;
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        window.location.href = 'result.html';
      }, 500);
    }
  }, 450);
}

window.addEventListener('DOMContentLoaded', () => {
  simulateProcessing();
});
