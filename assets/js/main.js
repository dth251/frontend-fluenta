// ========================================================
// FLUENTA CLINICAL ENGINE - CLIENT LOGIC (main.js)
// ========================================================

// 1. WAVEFORM ACOUSTIC RENDERER (Dạng sóng âm học)
function renderWaveform(marks) {
  const wf = document.getElementById('waveform');
  if (!wf) return;
  wf.innerHTML = '';
  for (let i = 0; i < 48; i++) {
    const s = document.createElement('span');
    const h = 8 + Math.round(Math.random() * 42);
    s.style.height = h + 'px';
    if (marks && marks.includes(i)) {
      s.classList.add('mark');
    }
    wf.appendChild(s);
  }
}

// 2. PHÒNG THU ÂM THƯỜNG (practice.html)
let recording = false;
function toggleRecord() {
  recording = !recording;
  const btn = document.getElementById('recBtn');
  const status = document.getElementById('recStatus');
  const subStatus = document.getElementById('recSubStatus');
  if (!btn) return;

  btn.classList.toggle('recording', recording);
  if (recording) {
    btn.textContent = 'DỪNG GHI ÂM & PHÂN TÍCH';
    if (status) status.textContent = 'Trạng thái: Đang thu tín hiệu âm học... Hãy đọc đoạn văn tự nhiên.';
    if (subStatus) subStatus.textContent = 'Nhấn nút đỏ khi hoàn thành để chuyển dữ liệu vào mô hình AI.';
  } else {
    btn.textContent = 'ĐANG ĐÓNG GÓI TÍN HIỆU...';
    if (status) status.textContent = 'Trạng thái: Đang chuyển luồng âm thanh sang Tầng 1 phân tích...';
    setTimeout(() => {
      window.location.href = 'processing.html';
    }, 600);
  }
}

// 3. BÀI ĐÁNH GIÁ ĐẦU VÀO BASELINE (baseline-test.html)
let baselineRecording = false;
function toggleBaselineRecord() {
  baselineRecording = !baselineRecording;
  const btn = document.getElementById('baselineBtn');
  const status = document.getElementById('baselineStatus');
  if (!btn) return;

  btn.classList.toggle('recording', baselineRecording);
  if (baselineRecording) {
    btn.textContent = 'DỪNG & LƯU MẪU ĐÁNH GIÁ';
    if (status) status.textContent = 'Trạng thái: Đang ghi nhận 3 đoạn văn đánh giá mốc ban đầu...';
  } else {
    btn.textContent = 'ĐANG THIẾT LẬP HỒ SƠ...';
    if (status) status.textContent = 'Trạng thái: Đã lưu mốc tham chiếu (%SS = 19.0%). Đang chuyển tiếp...';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 900);
  }
}

// 4. MÀN HÌNH XỬ LÝ 2 TẦNG (processing.html)
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

// 5. THƯ VIỆN KỸ THUẬT LÂM SÀNG (library.html)
function filterLibrary(category, btnElement) {
  document.querySelectorAll('.med-lib-btn').forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const items = document.querySelectorAll('.library-item');
  items.forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// 6. GỬI BÁO CÁO CHO CHUYÊN GIA (specialist-connect.html)
function sendSpecialistReport(event) {
  if (event) event.preventDefault();
  const alertBox = document.getElementById('connectAlert');
  if (alertBox) {
    alertBox.style.display = 'block';
    alertBox.textContent = 'Hồ sơ mã bệnh án #FL-2026-0842 đã được gửi mã hóa an toàn tới Chuyên viên Âm ngữ Trị liệu chỉ định.';
  }
}
