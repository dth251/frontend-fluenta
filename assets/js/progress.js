// ========================================================
// PROGRESS TRACKING LOGIC (progress.js)
// Mobile: mỗi phiên chỉ hiện dữ liệu chính, bấm "Chi tiết" để mở thêm.
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('sessionRows');
  if (!list) return;

  list.classList.add('js-collapsible');
  list.querySelectorAll('.session-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.session-row');
      const open = row.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Thu gọn' : 'Chi tiết';
    });
  });
});
