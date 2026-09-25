// ========================================================
// RESULT PAGE LOGIC (result.js)
// ========================================================
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

document.addEventListener('DOMContentLoaded', () => {
  // Hiển thị 3 điểm ngắt quãng tại tọa độ [8, 20, 33]
  renderWaveform([8, 20, 33]);
});
