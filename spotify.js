// Spotify Player with Web Audio API
class SpotifyPlayer {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.audioBuffer = null;
    this.sourceNode = null;
    this.isPlaying = false;
    this.startTime = 0;
    this.pauseTime = 0;
    this.currentTrackIndex = 0;
    this.tracks = []; // Will be loaded from config
    this.analyser = this.audioContext.createAnalyser();
    
    this.initElements();
    this.initEvents();
    this.loadTracks();
  }

  async loadTracks() {
    try {
      // In a real implementation, you would load actual audio files
      // This is a simulation for demonstration
      this.tracks = [
        { 
          title: "Never Gonna Give You Up", 
          artist: "Rick Astley",
          duration: 212,
          audioFile: "rick_astley.mp3" // Replace with actual file
        },
        // Add more tracks
      ];
      
      // Simulate loading audio buffer
      this.audioBuffer = await this.loadAudioBuffer(this.tracks[0].audioFile);
      this.render();
    } catch (error) {
      console.error("Error loading tracks:", error);
    }
  }

  async loadAudioBuffer(url) {
    // In a real app, you would fetch and decode the audio file
    // This is a placeholder implementation
    return new Promise((resolve) => {
      // Simulate loading
      setTimeout(() => {
        const buffer = this.audioContext.createBuffer(2, 44100 * 2, 44100);
        resolve(buffer);
      }, 500);
    });
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
    this.coverElement = document.querySelector('.spotify-cover');
  }

  initEvents() {
    this.toggleBtn.addEventListener('click', () => this.togglePlayer());
    this.playBtn.addEventListener('click', () => this.togglePlay());
    this.prevBtn.addEventListener('click', () => this.prevTrack());
    this.nextBtn.addEventListener('click', () => this.nextTrack());
    this.progressBar.parentElement.addEventListener('click', (e) => this.seek(e));
    
    // Mobile touch events
    this.progressBar.parentElement.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.progressBar.parentElement.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    this.progressBar.parentElement.addEventListener('touchend', (e) => this.handleTouchEnd(e));
  }

  togglePlayer() {
    this.playerElement.classList.toggle('active');
    this.toggleBtn.innerHTML = this.playerElement.classList.contains('active') 
      ? '<i class="fab fa-spotify"></i> Hide Spotify Player' 
      : '<i class="fab fa-spotify"></i> Show Spotify Player';
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (!this.audioBuffer) return;

    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = this.audioBuffer;
    this.sourceNode.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    
    this.sourceNode.start(0, this.pauseTime % this.audioBuffer.duration);
    this.startTime = this.audioContext.currentTime - this.pauseTime;
    
    this.isPlaying = true;
    this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    this.updateProgress();
  }

  pause() {
    if (!this.isPlaying) return;
    
    this.sourceNode.stop();
    this.pauseTime = this.audioContext.currentTime - this.startTime;
    this.isPlaying = false;
    this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
    cancelAnimationFrame(this.animationFrame);
  }

  updateProgress() {
    if (this.isPlaying) {
      const currentTime = this.audioContext.currentTime - this.startTime;
      const duration = this.audioBuffer.duration;
      const progressPercent = (currentTime / duration) * 100;
      
      this.progressBar.style.width = `${progressPercent}%`;
      this.currentTimeElement.textContent = this.formatTime(currentTime);
      
      if (currentTime >= duration) {
        this.nextTrack();
      } else {
        this.animationFrame = requestAnimationFrame(() => this.updateProgress());
      }
    }
  }

  seek(e) {
    if (!this.audioBuffer) return;
    
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const percentClicked = clickPosition / progressBar.offsetWidth;
    const seekTime = percentClicked * this.audioBuffer.duration;
    
    this.pauseTime = seekTime;
    this.progressBar.style.width = `${percentClicked * 100}%`;
    this.currentTimeElement.textContent = this.formatTime(seekTime);
    
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }

  // Mobile touch handlers
  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.seek(e.touches[0]);
  }

  handleTouchMove(e) {
    e.preventDefault();
    this.seek(e.touches[0]);
  }

  handleTouchEnd() {
    // Additional touch end logic if needed
  }

  prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.loadTrack();
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.loadTrack();
  }

  async loadTrack() {
    const track = this.tracks[this.currentTrackIndex];
    
    try {
      this.pause();
      this.audioBuffer = await this.loadAudioBuffer(track.audioFile);
      
      this.titleElement.textContent = track.title;
      this.artistElement.textContent = track.artist;
      this.durationElement.textContent = this.formatTime(track.duration);
      this.progressBar.style.width = '0%';
      this.currentTimeElement.textContent = '0:00';
      this.pauseTime = 0;
      
      if (this.isPlaying) {
        this.play();
      }
    } catch (error) {
      console.error("Error loading track:", error);
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  render() {
    if (this.tracks.length > 0) {
      const track = this.tracks[this.currentTrackIndex];
      this.titleElement.textContent = track.title;
      this.artistElement.textContent = track.artist;
      this.durationElement.textContent = this.formatTime(track.duration);
    }
  }
}

// Initialize Spotify Player
document.addEventListener('DOMContentLoaded', () => {
  new SpotifyPlayer();
});
