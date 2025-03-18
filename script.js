const songs = [
  { name: 'Song 1', file: 'assets/song1.mp3' },
  { name: 'Song 2', file: 'assets/song2.mp3' },
];

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].file);
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const trackName = document.getElementById('track-name');
const volumeControl = document.getElementById('volume');

playPauseButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseButton.textContent = '⏸️';
  } else {
    audio.pause();
    playPauseButton.textContent = '▶️';
  }
});

prevButton.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  audio.src = songs[currentSongIndex].file;
  audio.play();
  trackName.textContent = songs[currentSongIndex].name;
  playPauseButton.textContent = '⏸️';
});

nextButton.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  audio.src = songs[currentSongIndex].file;
  audio.play();
  trackName.textContent = songs[currentSongIndex].name;
  playPauseButton.textContent = '⏸️';
});

volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
});
