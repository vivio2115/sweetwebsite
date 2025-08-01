document.addEventListener('DOMContentLoaded', function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (localStorage.getItem('vivio_preloader_shown')) {
    preloader.style.display = 'none';
    document.body.style.overflow = '';
    return;
  }
  
  document.body.style.overflow = 'hidden';
  
  // Reduce animation time for users who prefer reduced motion
  const animationDuration = prefersReducedMotion ? 500 : 3000;
  const fadeOutDuration = prefersReducedMotion ? 100 : 300;
  
  setTimeout(function () {
    preloader.style.opacity = '0';
    preloader.style.transition = `opacity ${fadeOutDuration}ms ease-out`;
    setTimeout(function () {
      preloader.style.display = 'none';
      document.body.style.overflow = '';
      localStorage.setItem('vivio_preloader_shown', '1');
    }, fadeOutDuration);
  }, animationDuration);
});
