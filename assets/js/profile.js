// ========================================================
// PROFILE PAGE LOGIC (profile.js)
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('profileForm');
  const status = document.getElementById('profileStatus');

  const avatarInput = document.getElementById('avatarInput');
  const btnUploadAvatar = document.getElementById('btnUploadAvatar');
  const btnRemoveAvatar = document.getElementById('btnRemoveAvatar');
  const avatarPreview = document.getElementById('avatarPreview');
  const avatarDefaultIcon = document.getElementById('avatarDefaultIcon');
  const headerAvatarSpan = document.querySelector('.app-user-toggle .app-avatar');

  // Khôi phục avatar đã lưu từ localStorage nếu có
  const savedAvatar = localStorage.getItem('fluenta_user_avatar');
  if (savedAvatar) {
    applyAvatar(savedAvatar);
  }

  // Bấm nút -> mở file dialog
  if (btnUploadAvatar && avatarInput) {
    btnUploadAvatar.addEventListener('click', () => {
      avatarInput.click();
    });

    avatarInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        alert('Dung lượng ảnh vượt quá 5MB. Vui lòng chọn ảnh nhỏ hơn.');
        avatarInput.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        applyAvatar(dataUrl);
        localStorage.setItem('fluenta_user_avatar', dataUrl);
        if (status) {
          status.textContent = '✓ Đã cập nhật ảnh đại diện.';
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Nút gỡ ảnh
  if (btnRemoveAvatar) {
    btnRemoveAvatar.addEventListener('click', () => {
      removeAvatar();
      localStorage.removeItem('fluenta_user_avatar');
      if (status) {
        status.textContent = '✓ Đã đưa ảnh đại diện về mặc định.';
      }
    });
  }

  function applyAvatar(src) {
    if (avatarPreview && avatarDefaultIcon) {
      avatarPreview.src = src;
      avatarPreview.classList.remove('d-none');
      avatarDefaultIcon.classList.add('d-none');
    }
    if (btnRemoveAvatar) {
      btnRemoveAvatar.classList.remove('d-none');
    }
    // Cập nhật cả avatar trên thanh header
    if (headerAvatarSpan) {
      headerAvatarSpan.innerHTML = `<img class="app-avatar-img" src="${src}" alt="Ảnh đại diện">`;
    }
  }

  function removeAvatar() {
    if (avatarPreview && avatarDefaultIcon) {
      avatarPreview.src = '';
      avatarPreview.classList.add('d-none');
      avatarDefaultIcon.classList.remove('d-none');
    }
    if (btnRemoveAvatar) {
      btnRemoveAvatar.classList.add('d-none');
    }
    if (avatarInput) {
      avatarInput.value = '';
    }
    // Khôi phục avatar icon trên header
    if (headerAvatarSpan) {
      headerAvatarSpan.innerHTML = `<svg class="app-avatar-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5z"/></svg>`;
    }
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (status) {
        status.textContent = '✓ Đã lưu thông tin hồ sơ.';
      }
    });
  }
});
