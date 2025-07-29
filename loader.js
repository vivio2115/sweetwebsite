document.addEventListener('DOMContentLoaded', function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  if (localStorage.getItem('vivio_preloader_shown')) {
    preloader.style.display = 'none';
    document.body.style.overflow = '';
    return;
  }
  document.body.style.overflow = 'hidden';
  setTimeout(function () {
    preloader.style.opacity = '0';
    setTimeout(function () {
      preloader.style.display = 'none';
      document.body.style.overflow = '';
      localStorage.setItem('vivio_preloader_shown', '1');
    }, 300);
  }, 3000);
});
