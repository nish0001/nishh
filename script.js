const audio = new Audio('assets/song1.mp3');
const playPauseButton = document.getElementById('play-pause');
const stopButton = document.getElementById('stop');
const trackName = document.getElementById('track-name');

playPauseButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseButton.textContent = '⏸️';
  } else {
    audio.pause();
    playPauseButton.textContent = '▶️';
  }
});

stopButton.addEventListener('click', () => {
  audio.pause();
  audio.currentTime = 0;
  playPauseButton.textContent = '▶️';
});
