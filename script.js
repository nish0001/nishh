const songs = [
  {
    title: "Song 1",
    artist: "Artist 1",
    src: "assets/music/song1.mp3",
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    src: "assets/music/song2.mp3",
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    src: "assets/music/song3.mp3",
  },
];

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].src);
const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const volumeControl = document.getElementById("volume");
const playlist = document.getElementById("playlist");

// Load song
function loadSong(song) {
  songTitle.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

// Play/Pause
function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Change volume
function setVolume() {
  audio.volume = volumeControl.value;
}

// Next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Populate playlist
function populatePlaylist() {
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(songs[currentSongIndex]);
      audio.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    playlist.appendChild(li);
  });
}

// Event Listeners
playPauseBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
volumeControl.addEventListener("input", setVolume);
audio.addEventListener("ended", nextSong);

// Initialize
loadSong(songs[currentSongIndex]);
populatePlaylist();
