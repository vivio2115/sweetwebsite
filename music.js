document.addEventListener('DOMContentLoaded', function () {
  const audio = document.createElement('audio');
  audio.src = 'assets/music/music1.mp3';
  audio.volume = 0.18;
  audio.loop = false;
  audio.style.display = 'none';
  document.body.appendChild(audio);

  const loopStart = 7;
  const loopEnd = 140;

  function startMusic() {
    audio.currentTime = loopStart;
    audio.play();
    audio.addEventListener('timeupdate', function () {
      if (audio.currentTime >= loopEnd) {
        audio.currentTime = loopStart;
        audio.play();
      }
    });
  }

  const modal = document.getElementById('music-modal');
  const btnYes = document.getElementById('music-yes');
  const btnNo = document.getElementById('music-no');
  if (modal && btnYes && btnNo) {
    btnYes.onclick = function() {
      modal.style.display = 'none';
      startMusic();
    };
    btnNo.onclick = function() {
      modal.style.display = 'none';
    };
  } else {
    startMusic();
  }
});
