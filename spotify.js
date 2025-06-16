// Ultimate Spotify Player with Multiple Track Support
class SpotifyPlayer {
  constructor() {
    // Audio context setup
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.audioBuffer = null;
    this.sourceNode = null;
    this.gainNode = this.audioContext.createGain();
    this.analyser = this.audioContext.createAnalyser();
    this.trackProgress = 0;
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.volume = 0.7;
    this.buffered = 0;
    this.lastUpdateTime = 0;
    
    // Track playlist (can be loaded from config)
    this.tracks = [
      {
        title: "Blinding Lights",
        artist: "The Weeknd",
        duration: 200,
        audioUrl: "https://example.com/music/weeknd.mp3", // Replace with actual URL
        coverArt: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36"
      },
      {
        title: "Dance Monkey",
        artist: "Tones and I",
        duration: 210,
        audioUrl: "https://example.com/music/dancemonkey.mp3", // Replace with actual URL
        coverArt: "https://i.scdn.co/image/ab67616d0000b273a935e468a2e54d8e1f1eac7c"
      },
      {
        title: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        duration: 138,
        audioUrl: "https://example.com/music/stay.mp3", // Replace with actual URL
        coverArt: "https://i.scdn.co/image/ab67616d0000b273d8cc2281fcd4519ca020926b"
      }
    ];

    this.initElements();
    this.initEvents();
    this.loadTrack(this.currentTrackIndex);
    this.setupVisualizer();
  }

  initElements() {
    // Player controls
    this.playerElement = document.getElementById('spotifyPlayer');
    this.toggleBtn = document.getElementById('spotifyToggleBtn');
    this.playBtn = document.getElementById('spotifyPlayBtn');
    this.prevBtn = document.getElementById('spotifyPrevBtn');
    this.nextBtn = document.getElementById('spotifyNextBtn');
    this.volumeSlider = document.getElementById('spotifyVolume');
    this.shuffleBtn = document.getElementById('spotifyShuffle');
    this.repeatBtn = document.getElementById('spotifyRepeat');
    
    // Track info
    this.progressBar = document.getElementById('spotifyProgress');
    this.currentTimeElement = document.getElementById('spotifyCurrentTime');
    this.durationElement = document.getElementById('spotifyDuration');
    this.titleElement = document.querySelector('.spotify-title');
    this.artistElement = document.querySelector('.spotify-artist');
    this.coverElement = document.querySelector('.spotify-cover');
    
    // Visualizer
    this.visualizerCanvas = document.getElementById('spotifyVisualizer');
    this.canvasCtx = this.visualizerCanvas.getContext('2d');
  }

  initEvents() {
    // Button events
    this.toggleBtn.addEventListener('click', () => this.togglePlayer());
    this.playBtn.addEventListener('click', () => this.togglePlay());
    this.prevBtn.addEventListener('click', () => this.prevTrack());
    this.nextBtn.addEventListener('click', () => this.nextTrack());
    this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
    this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
    
    // Progress bar
    this.progressBar.parentElement.addEventListener('click', (e) => this.seek(e));
    this.progressBar.parentElement.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.progressBar.parentElement.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
    this.progressBar.parentElement.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
    
    // Volume control
    if (this.volumeSlider) {
      this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
    }
    
    // Handle tab visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.lastUpdateTime = this.audioContext.currentTime;
      }
    });
  }

  async loadTrack(index) {
    try {
      this.pause();
      this.currentTrackIndex = index;
      const track = this.tracks[index];
      
      // Show loading state
      this.playBtn.disabled = true;
      this.playBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      
      // Load audio buffer
      const response = await fetch(track.audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      
      // Update UI
      this.titleElement.textContent = track.title;
      this.artistElement.textContent = track.artist;
      this.durationElement.textContent = this.formatTime(track.duration);
      this.coverElement.src = track.coverArt;
      this.progressBar.style.width = '0%';
      this.currentTimeElement.textContent = '0:00';
      this.trackProgress = 0;
      
      // Enable controls
      this.playBtn.disabled = false;
      this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
      
      // Autoplay if was playing before
      if (this.isPlaying) {
        this.play();
      }
    } catch (error) {
      console.error('Error loading track:', error);
      this.playBtn.disabled = false;
      this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
      alert('Failed to load track. Please try another one.');
    }
  }

  play() {
    if (!this.audioBuffer) return;
    
    // Resume audio context if suspended
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    // Create new source node
    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = this.audioBuffer;
    
    // Connect nodes: source -> gain -> analyser -> destination
    this.sourceNode.connect(this.gainNode);
    this.gainNode.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    
    // Set volume
    this.gainNode.gain.value = this.volume;
    
    // Start playback
    this.startTime = this.audioContext.currentTime - this.trackProgress;
    this.sourceNode.start(0, this.trackProgress);
    
    // Set end event
    this.sourceNode.onended = () => {
      if (!this.repeatMode) {
        this.nextTrack();
      } else {
        this.play();
      }
    };
    
    this.isPlaying = true;
    this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    
    // Start progress and visualizer updates
    this.updateProgress();
    this.drawVisualizer();
  }

  pause() {
    if (!this.isPlaying || !this.sourceNode) return;
    
    // Store current progress
    this.trackProgress = this.audioContext.currentTime - this.startTime;
    
    // Stop playback
    this.sourceNode.stop();
    this.sourceNode.disconnect();
    this.sourceNode = null;
    
    this.isPlaying = false;
    this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
    
    // Cancel animation frames
    cancelAnimationFrame(this.progressAnimation);
    cancelAnimationFrame(this.visualizerAnimation);
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateProgress() {
    if (this.isPlaying && this.sourceNode) {
      const currentTime = this.audioContext.currentTime - this.startTime;
      const duration = this.audioBuffer.duration;
      const progressPercent = (currentTime / duration) * 100;
      
      this.progressBar.style.width = `${progressPercent}%`;
      this.currentTimeElement.textContent = this.formatTime(currentTime);
      
      this.progressAnimation = requestAnimationFrame(() => this.updateProgress());
    }
  }

  seek(e) {
    if (!this.audioBuffer) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentClicked = clickPosition / progressBar.offsetWidth;
    const seekTime = percentClicked * this.audioBuffer.duration;
    
    this.trackProgress = seekTime;
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
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.touches[0].clientX - rect.left;
    const percentClicked = clickPosition / progressBar.offsetWidth;
    this.seek({ currentTarget: progressBar, clientX: e.touches[0].clientX });
    e.preventDefault(); // Prevent scrolling
  }

  handleTouchMove(e) {
    const progressBar = e.currentTarget.parentElement;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.touches[0].clientX - rect.left;
    const percentClicked = Math.max(0, Math.min(1, clickPosition / progressBar.offsetWidth));
    this.progressBar.style.width = `${percentClicked * 100}%`;
    this.currentTimeElement.textContent = this.formatTime(percentClicked * this.audioBuffer.duration);
    e.preventDefault(); // Prevent scrolling
  }

  handleTouchEnd(e) {
    this.trackProgress = (parseFloat(this.progressBar.style.width) / 100) * this.audioBuffer.duration;
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }

  prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.loadTrack(this.currentTrackIndex);
    if (this.isPlaying) this.play();
  }

  nextTrack() {
    if (this.shuffleMode) {
      this.currentTrackIndex = Math.floor(Math.random() * this.tracks.length);
    } else {
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    }
    this.loadTrack(this.currentTrackIndex);
    if (this.isPlaying) this.play();
  }

  toggleShuffle() {
    this.shuffleMode = !this.shuffleMode;
    this.shuffleBtn.classList.toggle('active', this.shuffleMode);
  }

  toggleRepeat() {
    this.repeatMode = !this.repeatMode;
    this.repeatBtn.classList.toggle('active', this.repeatMode);
  }

  setVolume(value) {
    this.volume = parseFloat(value);
    if (this.gainNode) {
      this.gainNode.gain.value = this.volume;
    }
  }

  setupVisualizer() {
    this.analyser.fftSize = 256;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    
    // Set canvas size
    this.visualizerCanvas.width = this.visualizerCanvas.offsetWidth;
    this.visualizerCanvas.height = this.visualizerCanvas.offsetHeight;
  }

  drawVisualizer() {
    if (!this.isPlaying) return;
    
    this.analyser.getByteFrequencyData(this.dataArray);
    
    this.canvasCtx.clearRect(0, 0, this.visualizerCanvas.width, this.visualizerCanvas.height);
    
    const barWidth = (this.visualizerCanvas.width / this.bufferLength) * 2.5;
    let x = 0;
    
    for (let i = 0; i < this.bufferLength; i++) {
      const barHeight = (this.dataArray[i] / 255) * this.visualizerCanvas.height;
      
      this.canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
      this.canvasCtx.fillRect(
        x, 
        this.visualizerCanvas.height - barHeight, 
        barWidth, 
        barHeight
      );
      
      x += barWidth + 1;
    }
    
    this.visualizerAnimation = requestAnimationFrame(() => this.drawVisualizer());
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  togglePlayer() {
    this.playerElement.classList.toggle('active');
    this.toggleBtn.innerHTML = this.playerElement.classList.contains('active') 
      ? '<i class="fab fa-spotify"></i> Hide Player' 
      : '<i class="fab fa-spotify"></i> Show Player';
  }

  // Public method to add tracks
  addTrack(track) {
    this.tracks.push(track);
    if (this.tracks.length === 1) {
      this.loadTrack(0);
    }
  }

  // Public method to remove tracks
  removeTrack(index) {
    if (index >= 0 && index < this.tracks.length) {
      this.tracks.splice(index, 1);
      if (this.currentTrackIndex >= this.tracks.length) {
        this.currentTrackIndex = Math.max(0, this.tracks.length - 1);
      }
      if (this.tracks.length > 0) {
        this.loadTrack(this.currentTrackIndex);
      } else {
        this.pause();
        this.titleElement.textContent = 'No tracks available';
        this.artistElement.textContent = '';
        this.coverElement.src = '';
      }
    }
  }
}

// Initialize Spotify Player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const spotifyPlayer = new SpotifyPlayer();
  
  // Expose player to window for debugging or additional control
  window.spotifyPlayer = spotifyPlayer;
  
  // Example: Add a track dynamically
  /*
  spotifyPlayer.addTrack({
    title: "New Track",
    artist: "New Artist",
    duration: 180,
    audioUrl: "https://example.com/newtrack.mp3",
    coverArt: "https://example.com/newcover.jpg"
  });
  */
});
