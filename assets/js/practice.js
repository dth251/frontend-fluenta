// ========================================================
// PRACTICE ROOM LOGIC (practice.js)
// ========================================================
let recording = false;

const LESSON_DATA = {
  'easy-onset': {
    badge: 'Kỹ thuật: Easy Onset',
    code: 'Mã số: TXT-01',
    passage: '"Sáng nay trời trong xanh, tôi ra công viên đi bộ và nghe chim hót. Không khí mát mẻ khiến tôi cảm thấy dễ chịu và tràn đầy năng lượng."',
    inst: '<strong>Chỉ định kỹ thuật:</strong> Áp dụng kỹ thuật thở ra nhẹ trước âm xát /s/ ở từ "Sáng" và tiếp xúc nhẹ nhàng môi ở âm tắc /b/ trong từ "bộ".'
  },
  'light-contact': {
    badge: 'Kỹ thuật: Light Contact',
    code: 'Mã số: TXT-02',
    passage: '"Ba má chuẩn bị đi bộ tản bộ trên con đường rợp bóng cây. Quả bóng bay lượn nhẹ nhàng trong gió sớm bình yên."',
    inst: '<strong>Chỉ định kỹ thuật:</strong> Tiếp xúc môi mềm mại ở các phụ âm tắc /b/, /p/, /t/, /d/. Không ghì chặt cơ quan cấu âm khi bắt đầu phát âm.'
  },
  'prolongation': {
    badge: 'Kỹ thuật: Prolonged Speech',
    code: 'Mã số: TXT-03',
    passage: '"Không gian thong thả và êm ả trôi qua. Những đám mây bồng bềnh dịu dàng trên bầu trời mênh mông."',
    inst: '<strong>Chỉ định kỹ thuật:</strong> Chủ động kéo dãn trường độ các nguyên âm trọng tâm, giữ nhịp độ ổn định khoảng 110 từ/phút.'
  },
  'diaphragm': {
    badge: 'Kỹ thuật: Diaphragmatic Breath',
    code: 'Mã số: TXT-04',
    passage: '"Hít một hơi thật sâu bằng cơ hoành, giữ cho vai thả lỏng, rồi từ từ thở ra nhẹ nhàng cùng lời nói."',
    inst: '<strong>Chỉ định kỹ thuật:</strong> Bụng phình ra khi lấy hơi, duy trì áp lực dưới thanh môn ổn định trước khi cất tiếng.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const lessonKey = params.get('lesson');
  if (lessonKey && LESSON_DATA[lessonKey]) {
    const data = LESSON_DATA[lessonKey];
    const badgeEl = document.getElementById('practiceTechniqueBadge');
    const codeEl = document.getElementById('practiceCodeBadge');
    const passageEl = document.getElementById('practicePassage');
    const instEl = document.getElementById('practiceInstruction');

    if (badgeEl) badgeEl.textContent = data.badge;
    if (codeEl) codeEl.textContent = data.code;
    if (passageEl) passageEl.textContent = data.passage;
    if (instEl) instEl.innerHTML = data.inst;
  }
});

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

