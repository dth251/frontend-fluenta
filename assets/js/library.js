// ========================================================
// LIBRARY PAGE LOGIC (library.js)
// ========================================================
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
