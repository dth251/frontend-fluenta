// ========================================================
// PROCESSING SIMULATION LOGIC (processing.js)
// ========================================================
function simulateProcessing() {
  const bar = document.getElementById('progressBar');
  const stageEl = document.getElementById('processingStage');
  const detailEl = document.getElementById('processingDetail');
  if (!bar) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += 20;
    bar.style.width = progress + '%';

    if (progress === 20) {
      if (stageEl) stageEl.textContent = 'TẦNG 1: TIỀN XỬ LÝ & BÓC TÁCH PHỔ ÂM HỌC (WAV2VEC2)';
      if (detailEl) detailEl.textContent = 'Khử nhiễu nền, bóc tách đặc trưng âm thanh và chia khung thời gian...';
    } else if (progress === 60) {
      if (stageEl) stageEl.textContent = 'TẦNG 1: NHẬN DIỆN SỰ KIỆN NÓI LẮP (STUTTERNET MODEL)';
      if (detailEl) detailEl.textContent = 'Phát hiện tọa độ Block, Lặp âm, Kéo dài âm (%SS = 12.0%)...';
    } else if (progress === 80) {
      if (stageEl) stageEl.textContent = 'TẦNG 2: LLM GUIDANCE & TỔNG HỢP HƯỚNG DẪN TRỊ LIỆU';
      if (detailEl) detailEl.textContent = 'Khởi tạo phác đồ can thiệp cá nhân hóa theo chuẩn lâm sàng ASHA...';
    } else if (progress >= 100) {
      clearInterval(interval);
      if (stageEl) stageEl.textContent = 'HOÀN THÀNH: DỮ LIỆU ĐÃ SẴN SÀNG';
      setTimeout(() => {
        window.location.href = 'result.html';
      }, 500);
    }
  }, 450);
}

window.addEventListener('DOMContentLoaded', () => {
  simulateProcessing();
});
