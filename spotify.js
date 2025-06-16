class SpotifyPlayer {
  constructor() {
    this.isPlaying = false;
    this.currentTime = 0;
    this.currentTrackIndex = 0;
    this.progressInterval = null;
    this.tracks = [spotifyConfig.currentTrack, ...spotifyConfig.playlist];
    
    this.initElements();
    this.initEvents();
    this.render();
  }

  initElements() {
    this.playerElement = document.getElementById('spotifyPlayer');
    this.toggleBtn = document.getElementById('spotifyToggleBtn');
    this.playBtn = document.getElementById('spotifyPlayBtn');
    this.prevBtn = document.getElementById('spotifyPrevBtn');
    this.nextBtn = document.getElementById('spotifyNextBtn');
    this.progressBar = document.getElementById('spotifyProgress');
    this.currentTimeElement = document.getElementById('spotifyCurrentTime');
    this.durationElement = document.getElementById('spotifyDuration');
    this.titleElement = document.querySelector('.spotify-title');
    this.artistElement = document.querySelector('.spotify-artist');
  }

  initEvents() {
    this.toggleBtn.addEventListener('click', () => this.togglePlayer());
    this.playBtn.addEventListener('click', () => this.togglePlay());
    this.prevBtn.addEventListener('click', () => this.prevTrack());
    this.nextBtn.addEventListener('click', () => this.nextTrack());
  }

  togglePlayer() {
    this.playerElement.classList.toggle('active');
    this.toggleBtn.innerHTML = this.playerElement.classList.contains('active') 
      ? '<i class="fab fa-spotify"></i> Hide Spotify Player' 
      : '<i class="fab fa-spotify"></i> Show Spotify Player';
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    
    if (this.isPlaying) {
      this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      this.startProgress();
    } else {
      this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
      clearInterval(this.progressInterval);
    }
  }

  startProgress() {
    clearInterval(this.progressInterval);
    this.progressInterval = setInterval(() => {
      if (this.currentTime >= this.getCurrentTrack().duration) {
        this.nextTrack();
      } else {
        this.currentTime++;
        this.updateProgress();
      }
    }, 1000);
  }

  updateProgress() {
    const progressPercent = (this.currentTime / this.getCurrentTrack().duration) * 100;
    this.progressBar.style.width = `${progressPercent}%`;
    this.currentTimeElement.textContent = this.formatTime(this.currentTime);
  }

  prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.loadTrack();
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.loadTrack();
  }

  loadTrack() {
    const track = this.getCurrentTrack();
    this.currentTime = 0;
    this.titleElement.textContent = track.title;
    this.artistElement.textContent = track.artist;
    this.durationElement.textContent = this.formatTime(track.duration);
    this.progressBar.style.width = '0%';
    this.currentTimeElement.textContent = '0:00';
    
    if (this.isPlaying) {
      clearInterval(this.progressInterval);
      this.startProgress();
    }
  }

  getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  render() {
    if (spotifyConfig.showPlayer) {
      this.togglePlayer();
    }
    this.loadTrack();
  }
}

// Initialize Spotify Player
document.addEventListener('DOMContentLoaded', () => {
  new SpotifyPlayer();
});
