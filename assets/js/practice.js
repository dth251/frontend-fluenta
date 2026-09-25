// ========================================================
// PRACTICE ROOM LOGIC (practice.js)
// Timer, mức micro thật (Web Audio) hoặc mô phỏng, trạng thái môi trường,
// chế độ tập trung khi ghi âm, và một CTA "Xem kết quả" sau khi hoàn thành.
// ========================================================

// Đoạn văn theo bài tập. Từ cần chú ý: [[từ]] -> được tô và đánh số.
const LESSON_DATA = {
  'easy-onset': {
    badge: 'Kỹ thuật: Easy Onset',
    code: 'Mã số: TXT-01',
    passage: '"[[Sáng]] nay trời trong xanh, tôi ra công viên đi [[bộ]] và nghe chim hót. [[Không]] khí mát mẻ khiến tôi cảm thấy dễ chịu và tràn đầy năng lượng."',
    focus: [
      'thở ra nhẹ trước âm xát /s/, không đóng chặt thanh môn.',
      'chạm môi thật nhẹ ở âm tắc /b/.',
      'khởi âm êm dịu, để hơi đi ra trước khi phát âm.'
    ]
  },
  'light-contact': {
    badge: 'Kỹ thuật: Light Contact',
    code: 'Mã số: TXT-02',
    passage: '"[[Ba]] má chuẩn bị đi bộ tản bộ trên con đường rợp bóng cây. Quả [[bóng]] [[bay]] lượn nhẹ nhàng trong gió sớm bình yên."',
    focus: [
      'môi chạm nhẹ ở /b/, không mím chặt.',
      'giữ lưỡi và môi mềm khi chuyển sang nguyên âm.',
      'nối liền từ trước, không dừng lấy đà.'
    ]
  },
  'prolongation': {
    badge: 'Kỹ thuật: Prolonged Speech',
    code: 'Mã số: TXT-03',
    passage: '"Không gian [[thong thả]] và [[êm ả]] trôi qua. Những đám mây bồng bềnh dịu dàng trên bầu trời [[mênh mông]]."',
    focus: [
      'kéo dài nhẹ nguyên âm /o/, giữ nhịp đều.',
      'nối hai tiếng liền mạch, không ngắt giữa chừng.',
      'duy trì hơi đến cuối câu.'
    ]
  },
  'diaphragm': {
    badge: 'Kỹ thuật: Diaphragmatic Breath',
    code: 'Mã số: TXT-04',
    passage: '"[[Hít]] một hơi thật sâu bằng cơ hoành, giữ cho vai thả lỏng, rồi từ từ [[thở ra]] nhẹ nhàng cùng [[lời nói]]."',
    focus: [
      'bụng nở ra khi lấy hơi, vai không nâng.',
      'thả hơi chậm và đều.',
      'bắt đầu nói khi hơi đã đi ra.'
    ]
  }
};

const MIN_SECONDS = 15;
const state = { recording: false, startedAt: 0, timerId: null, rafId: null, stream: null, audioCtx: null, levels: [] };

const $ = (id) => document.getElementById(id);
const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function renderLesson(data) {
  let n = 0;
  const words = [];
  const html = escapeHtml(data.passage).replace(/\[\[(.+?)\]\]/g, (_, w) => {
    n += 1;
    words.push(w);
    return `<mark class="focus-word">${w}<span class="focus-num" aria-hidden="true">${n}</span></mark>`;
  });
  $('practiceTechniqueBadge').textContent = data.badge;
  $('practiceCodeBadge').textContent = data.code;
  $('practicePassage').innerHTML = html;
  $('practiceFocusList').innerHTML = words
    .map((w, i) => `<li><strong>${w}</strong> — ${escapeHtml(data.focus[i] || '')}</li>`)
    .join('');
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function announce(text) {
  $('recStatus').textContent = text;
}

// ---------- Mức micro ----------
function setMeter(level) {
  const pct = Math.max(0, Math.min(100, Math.round(level * 100)));
  $('micMeterFill').style.transform = `scaleX(${pct / 100})`;
  $('micMeter').setAttribute('aria-valuenow', String(pct));
  $('micLevelText').textContent = !state.recording ? 'Chưa bật' : pct < 8 ? 'Rất nhỏ' : pct < 70 ? 'Tốt' : 'Quá lớn';
}

function setEnvironment(kind) {
  const env = {
    quiet: ['✓', 'Môi trường: yên tĩnh'],
    moderate: ['!', 'Môi trường: hơi ồn — kết quả vẫn dùng được'],
    noisy: ['!', 'Môi trường: ồn — nên chuyển sang nơi yên tĩnh hơn'],
    simulated: ['i', 'Micro mô phỏng — trình duyệt chưa cấp quyền truy cập micro'],
    idle: ['?', 'Môi trường: sẽ kiểm tra khi bắt đầu ghi']
  }[kind];
  $('envStatus').dataset.state = kind;
  $('envIcon').textContent = env[0];
  $('envText').textContent = env[1];
}

async function startMicrophone() {
  try {
    if (!navigator.mediaDevices?.getUserMedia) throw new Error('unsupported');
    state.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.audioCtx = new AudioContext();
    const analyser = state.audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    state.audioCtx.createMediaStreamSource(state.stream).connect(analyser);
    const buf = new Float32Array(analyser.fftSize);
    const tick = () => {
      analyser.getFloatTimeDomainData(buf);
      const rms = Math.sqrt(buf.reduce((sum, v) => sum + v * v, 0) / buf.length);
      state.levels.push(rms);
      setMeter(Math.min(1, rms * 6));
      state.rafId = requestAnimationFrame(tick);
    };
    tick();
    return true;
  } catch {
    // Không có quyền micro: mô phỏng mức âm để giao diện vẫn dùng được
    setEnvironment('simulated');
    const tick = () => {
      setMeter(0.25 + Math.random() * 0.4);
      state.rafId = setTimeout(tick, 120);
    };
    tick();
    return false;
  }
}

function stopMicrophone() {
  cancelAnimationFrame(state.rafId);
  clearTimeout(state.rafId);
  state.stream?.getTracks().forEach((t) => t.stop());
  state.audioCtx?.close();
  state.stream = null;
  state.audioCtx = null;
  setMeter(0);
}

// Độ ồn nền = mức thấp (phân vị 10%) trong lúc ghi
function evaluateEnvironment() {
  if (state.levels.length < 30) return;
  const sorted = [...state.levels].sort((a, b) => a - b);
  const floor = sorted[Math.floor(sorted.length * 0.1)];
  setEnvironment(floor < 0.01 ? 'quiet' : floor < 0.03 ? 'moderate' : 'noisy');
}

// ---------- Ghi âm ----------
async function startRecording() {
  state.recording = true;
  state.levels = [];
  document.body.classList.add('is-recording');
  const btn = $('recBtn');
  btn.classList.add('recording');
  btn.setAttribute('aria-pressed', 'true');
  btn.textContent = 'Dừng ghi âm';
  announce('Đang ghi âm. Hãy đọc đoạn văn tự nhiên.');

  const realMic = await startMicrophone();
  state.startedAt = Date.now();
  $('recTimer').textContent = '00:00';
  state.timerId = setInterval(() => {
    const sec = Math.floor((Date.now() - state.startedAt) / 1000);
    $('recTimer').textContent = formatTime(sec);
    $('recTarget').textContent = sec < MIN_SECONDS ? `Mục tiêu: còn ${MIN_SECONDS - sec} giây nữa` : 'Đã đủ thời lượng tối thiểu';
    if (realMic && sec >= 2) evaluateEnvironment();
  }, 250);
}

function stopRecording() {
  state.recording = false;
  clearInterval(state.timerId);
  stopMicrophone();
  document.body.classList.remove('is-recording');

  const sec = Math.floor((Date.now() - state.startedAt) / 1000);
  const btn = $('recBtn');
  btn.classList.remove('recording');
  btn.setAttribute('aria-pressed', 'false');
  btn.textContent = 'Bắt đầu ghi âm';
  btn.hidden = true;
  $('recTarget').textContent = 'Mục tiêu: 15–30 giây';

  $('recDoneSummary').textContent = sec < MIN_SECONDS
    ? `Đã ghi ${formatTime(sec)}. Bản ghi ngắn hơn 15 giây nên kết quả có thể kém chính xác.`
    : `Đã ghi ${formatTime(sec)}. Bản ghi sẵn sàng để phân tích.`;
  $('recDone').hidden = false;
  document.body.classList.add('is-done');
  announce('Đã dừng ghi âm. Nhấn “Xem kết quả” để phân tích.');
  $('recResultBtn').focus();
}

function resetRecording() {
  $('recDone').hidden = true;
  $('recBtn').hidden = false;
  $('recTimer').textContent = '00:00';
  $('recTarget').textContent = 'Mục tiêu: 15–30 giây';
  document.body.classList.remove('is-done');
  setEnvironment('idle');
  announce('Sẵn sàng ghi lại. Nhấn “Bắt đầu ghi âm”.');
  $('recBtn').focus();
}

document.addEventListener('DOMContentLoaded', () => {
  const lessonKey = new URLSearchParams(window.location.search).get('lesson');
  if (lessonKey && LESSON_DATA[lessonKey]) renderLesson(LESSON_DATA[lessonKey]);

  $('recBtn').addEventListener('click', () => (state.recording ? stopRecording() : startRecording()));
  $('recRetry').addEventListener('click', resetRecording);
});
