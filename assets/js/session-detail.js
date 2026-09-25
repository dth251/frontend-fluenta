// ========================================================
// SESSION DETAIL PAGE LOGIC (session-detail.js)
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
  // Hiển thị 4 điểm ngắt quãng của phiên cũ [5, 14, 25, 38]
  renderWaveform([5, 14, 25, 38]);
});
