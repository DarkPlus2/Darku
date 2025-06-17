// Ultimate Spotify Player with Enhanced Features
class SpotifyPlayer {
  constructor() {
    // Player state
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.volume = 0.7;
    this.shuffleMode = false;
    this.repeatMode = false;
    this.playerReady = false;
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Spotify embed iframe
    this.iframe = null;
    this.iframeReady = false;
    
    // Track playlist with Spotify URIs
    this.tracks = [
      {
        title: "MONTAGEM NEBULA - SLOWED",
        artist: "Rushex, MONTAGEM",
        spotifyUri: "spotify:track:5FWpId5TRidgoNdnuctomr",
        coverArt: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36"
      },
      {
        title: "Dance Monkey",
        artist: "Tones and I",
        spotifyUri: "spotify:track:166BJ1qwh0uxjj03XBetnq",
        coverArt: "https://i.scdn.co/image/ab67616d0000b273a935e468a2e54d8e1f1eac7c"
      },
      {
        title: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        spotifyUri: "spotify:track:2FnkrCrbXJuebXxnVtXiHI",
        coverArt: "https://i.scdn.co/image/ab67616d0000b273d8cc2281fcd4519ca020926b"
      }
    ];

    this.initElements();
    this.initEvents();
    this.initSpotifyPlayer();
  }

  initElements() {
    // Player controls
    this.playerElement = document.getElementById('spotifyPlayer') || this.createPlayerElement();
    this.toggleBtn = document.getElementById('spotifyToggleBtn') || this.createButton('spotifyToggleBtn', '<i class="fas fa-spotify"></i>');
    this.playBtn = document.getElementById('spotifyPlayBtn') || this.createButton('spotifyPlayBtn', '<i class="fas fa-play"></i>');
    this.prevBtn = document.getElementById('spotifyPrevBtn') || this.createButton('spotifyPrevBtn', '<i class="fas fa-step-backward"></i>');
    this.nextBtn = document.getElementById('spotifyNextBtn') || this.createButton('spotifyNextBtn', '<i class="fas fa-step-forward"></i>');
    this.volumeSlider = document.getElementById('spotifyVolume') || this.createVolumeSlider();
    this.shuffleBtn = document.getElementById('spotifyShuffle') || this.createButton('spotifyShuffle', '<i class="fas fa-random"></i>');
    this.repeatBtn = document.getElementById('spotifyRepeat') || this.createButton('spotifyRepeat', '<i class="fas fa-redo"></i>');
    
    // Track info
    this.progressBar = document.getElementById('spotifyProgress') || this.createProgressBar();
    this.currentTimeElement = document.getElementById('spotifyCurrentTime') || document.createElement('span');
    this.durationElement = document.getElementById('spotifyDuration') || document.createElement('span');
    this.titleElement = document.querySelector('.spotify-title') || document.createElement('div');
    this.artistElement = document.querySelector('.spotify-artist') || document.createElement('div');
    this.coverElement = document.querySelector('.spotify-cover') || document.createElement('img');
    this.iframeContainer = document.getElementById('spotifyIframeContainer') || document.createElement('div');
    
    // Add classes and attributes
    this.playerElement.classList.add('spotify-player');
    if (this.isMobile) {
      this.playerElement.classList.add('mobile');
    }
  }

  createPlayerElement() {
    const player = document.createElement('div');
    player.id = 'spotifyPlayer';
    document.body.appendChild(player);
    return player;
  }

  createButton(id, html) {
    const btn = document.createElement('button');
    btn.id = id;
    btn.innerHTML = html;
    this.playerElement.appendChild(btn);
    return btn;
  }

  createVolumeSlider() {
    const container = document.createElement('div');
    container.className = 'volume-container';
    
    const volDown = document.createElement('button');
    volDown.innerHTML = '<i class="fas fa-volume-down"></i>';
    volDown.addEventListener('click', () => this.setVolume(Math.max(0, this.volume - 0.1)));
    
    const slider = document.createElement('input');
    slider.id = 'spotifyVolume';
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1';
    slider.step = '0.01';
    slider.value = this.volume;
    
    const volUp = document.createElement('button');
    volUp.innerHTML = '<i class="fas fa-volume-up"></i>';
    volUp.addEventListener('click', () => this.setVolume(Math.min(1, this.volume + 0.1)));
    
    container.appendChild(volDown);
    container.appendChild(slider);
    container.appendChild(volUp);
    this.playerElement.appendChild(container);
    
    return slider;
  }

  createProgressBar() {
    const container = document.createElement('div');
    container.className = 'progress-container';
    
    const time = document.createElement('span');
    time.id = 'spotifyCurrentTime';
    time.textContent = '0:00';
    
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-bar-container';
    
    const progress = document.createElement('div');
    progress.className = 'progress-bar';
    
    const progressFill = document.createElement('div');
    progressFill.id = 'spotifyProgress';
    progressFill.className = 'progress-fill';
    
    const duration = document.createElement('span');
    duration.id = 'spotifyDuration';
    duration.textContent = '0:00';
    
    progress.appendChild(progressFill);
    progressContainer.appendChild(progress);
    
    container.appendChild(time);
    container.appendChild(progressContainer);
    container.appendChild(duration);
    this.playerElement.appendChild(container);
    
    return progressFill;
  }

  initEvents() {
    // Button events
    this.toggleBtn.addEventListener('click', () => this.togglePlayer());
    this.playBtn.addEventListener('click', () => this.togglePlay());
    this.prevBtn.addEventListener('click', () => this.prevTrack());
    this.nextBtn.addEventListener('click', () => this.nextTrack());
    this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
    this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
    
    // Volume control
    this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
    
    // Progress bar seeking
    const progressContainer = this.progressBar.parentElement.parentElement.querySelector('.progress-bar-container');
    progressContainer.addEventListener('click', (e) => this.handleSeek(e));
    
    // Handle tab visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.isPlaying) {
        this.pause();
      }
    });
    
    // Mobile touch events for progress bar
    if (this.isMobile) {
      progressContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e));
      progressContainer.addEventListener('touchmove', (e) => this.handleTouchMove(e));
      progressContainer.addEventListener('touchend', (e) => this.handleTouchEnd(e));
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (!this.playerElement.classList.contains('active')) return;
      
      switch(e.code) {
        case 'Space':
          e.preventDefault();
          this.togglePlay();
          break;
        case 'ArrowLeft':
          if (e.ctrlKey) this.prevTrack();
          break;
        case 'ArrowRight':
          if (e.ctrlKey) this.nextTrack();
          break;
        case 'KeyM':
          this.setVolume(this.volume > 0 ? 0 : 0.7);
          break;
      }
    });
  }

  initSpotifyPlayer() {
    // Create Spotify iframe
    this.iframe = document.createElement('iframe');
    this.iframe.id = 'spotifyIframe';
    this.iframe.src = `https://open.spotify.com/embed/track/${this.tracks[0].spotifyUri.split(':')[2]}?utm_source=generator`;
    this.iframe.width = '100%';
    this.iframe.height = '80';
    this.iframe.frameBorder = '0';
    this.iframe.allow = 'encrypted-media';
    this.iframe.style.display = 'none';
    this.iframeContainer.id = 'spotifyIframeContainer';
    this.iframeContainer.appendChild(this.iframe);
    this.playerElement.appendChild(this.iframeContainer);
    
    // Create track info display
    const trackInfo = document.createElement('div');
    trackInfo.className = 'track-info';
    
    const coverContainer = document.createElement('div');
    coverContainer.className = 'cover-container';
    this.coverElement.className = 'spotify-cover';
    coverContainer.appendChild(this.coverElement);
    
    const textInfo = document.createElement('div');
    textInfo.className = 'text-info';
    this.titleElement.className = 'spotify-title';
    this.artistElement.className = 'spotify-artist';
    textInfo.appendChild(this.titleElement);
    textInfo.appendChild(this.artistElement);
    
    trackInfo.appendChild(coverContainer);
    trackInfo.appendChild(textInfo);
    this.playerElement.insertBefore(trackInfo, this.iframeContainer);
    
    // Poll for player readiness
    this.checkPlayerReady();
  }

  checkPlayerReady() {
    if (this.iframe.contentWindow && this.iframe.contentWindow.document) {
      this.iframeReady = true;
      this.loadTrack(this.currentTrackIndex);
      this.updatePlayerState();
      
      // Set initial volume
      this.setVolume(this.volume);
    } else {
      setTimeout(() => this.checkPlayerReady(), 100);
    }
  }

  loadTrack(index) {
    if (!this.iframeReady || index < 0 || index >= this.tracks.length) return;
    
    this.currentTrackIndex = index;
    const track = this.tracks[index];
    
    // Update track info
    this.titleElement.textContent = track.title;
    this.artistElement.textContent = track.artist;
    this.coverElement.src = track.coverArt;
    this.coverElement.alt = `${track.title} by ${track.artist}`;
    this.progressBar.style.width = '0%';
    this.currentTimeElement.textContent = '0:00';
    this.durationElement.textContent = '0:00';
    
    // Update iframe source
    this.iframe.src = `https://open.spotify.com/embed/track/${track.spotifyUri.split(':')[2]}?utm_source=generator`;
    
    // Show loading state
    this.playBtn.disabled = true;
    this.playBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    // Clear previous interval if exists
    if (this.trackLoadCheckInterval) {
      clearInterval(this.trackLoadCheckInterval);
    }
    
    // Check when track is loaded
    this.trackLoadCheckInterval = setInterval(() => {
      try {
        const durationText = this.iframe.contentWindow.document.querySelector('.Root__now-playing-bar .playback-bar__progress-time:last-child')?.textContent;
        if (durationText && durationText.includes(':')) {
          clearInterval(this.trackLoadCheckInterval);
          this.playBtn.disabled = false;
          this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
          this.durationElement.textContent = durationText;
          
          // Start progress updates
          this.updateProgress();
        }
      } catch (e) {
        // Cross-origin errors, we'll handle gracefully
      }
    }, 100);
  }

  play() {
    if (!this.iframeReady) return;
    
    try {
      // Click play button in iframe
      const playButton = this.iframe.contentWindow.document.querySelector('.Root__now-playing-bar button[data-testid="control-button-playpause"]');
      if (playButton) {
        playButton.click();
        this.isPlaying = true;
        this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        this.updateProgress();
      }
    } catch (e) {
      console.error('Error controlling playback:', e);
    }
  }

  pause() {
    if (!this.iframeReady) return;
    
    try {
      // Click pause button in iframe
      const pauseButton = this.iframe.contentWindow.document.querySelector('.Root__now-playing-bar button[data-testid="control-button-playpause"]');
      if (pauseButton) {
        pauseButton.click();
        this.isPlaying = false;
        this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
        cancelAnimationFrame(this.progressAnimation);
      }
    } catch (e) {
      console.error('Error controlling playback:', e);
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateProgress() {
    if (this.isPlaying && this.iframeReady) {
      try {
        // Get progress from iframe
        const progressBar = this.iframe.contentWindow.document.querySelector('.Root__now-playing-bar .playback-bar__progress-time:first-child');
        const progressFill = this.iframe.contentWindow.document.querySelector('.Root__now-playing-bar .playback-bar__progress--background');
        
        if (progressBar && progressFill) {
          this.currentTimeElement.textContent = progressBar.textContent;
          const fillWidth = progressFill.style.width || '0%';
          this.progressBar.style.width = fillWidth;
          
          // Check if track ended
          if (fillWidth === '100%' && !this.repeatMode) {
            this.nextTrack();
          }
        }
      } catch (e) {
        // Cross-origin errors
      }
      
      this.progressAnimation = requestAnimationFrame(() => this.updateProgress());
    }
  }

  handleSeek(e) {
    if (!this.iframeReady) return;
    
    const progressContainer = e.currentTarget;
    const progressBar = progressContainer.querySelector('.progress-bar');
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentClicked = Math.max(0, Math.min(1, clickPosition / progressBar.offsetWidth));
    
    try {
      // Calculate seek position
      const seekSec = percentClicked * this.getTrackDuration();
      
      // Click on progress bar in iframe
      const iframeProgressBar = this.iframe.contentWindow.document.querySelector('.Root__now-playing-bar .playback-bar');
      if (iframeProgressBar) {
        const iframeRect = iframeProgressBar.getBoundingClientRect();
        const iframeClickX = iframeRect.left + (percentClicked * iframeRect.width);
        
        // Create and dispatch click event
        const clickEvent = new MouseEvent('click', {
          clientX: iframeClickX,
          bubbles: true,
          cancelable: true
        });
        iframeProgressBar.dispatchEvent(clickEvent);
      }
    } catch (e) {
      console.error('Error seeking:', e);
    }
  }

  getTrackDuration() {
    try {
      const timeParts = this.durationElement.textContent.split(':');
      return parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
    } catch {
      return 0;
    }
  }

  // Mobile touch handlers
  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    const progressBar = e.currentTarget.querySelector('.progress-bar');
    const rect = progressBar.getBoundingClientRect();
    this.touchStartPercent = (this.touchStartX - rect.left) / progressBar.offsetWidth;
    e.preventDefault();
  }

  handleTouchMove(e) {
    const progressBar = e.currentTarget.querySelector('.progress-bar');
    const rect = progressBar.getBoundingClientRect();
    const touchX = e.touches[0].clientX;
    const percentClicked = Math.max(0, Math.min(1, (touchX - rect.left) / progressBar.offsetWidth));
    
    this.progressBar.style.width = `${percentClicked * 100}%`;
    this.currentTimeElement.textContent = this.formatTime(percentClicked * this.getTrackDuration());
    e.preventDefault();
  }

  handleTouchEnd(e) {
    const progressContainer = e.currentTarget;
    const progressBar = progressContainer.querySelector('.progress-bar');
    const rect = progressBar.getBoundingClientRect();
    const touchX = e.changedTouches[0].clientX;
    const percentClicked = Math.max(0, Math.min(1, (touchX - rect.left) / progressBar.offsetWidth));
    
    this.handleSeek({
      currentTarget: progressContainer,
      clientX: touchX
    });
    e.preventDefault();
  }

  prevTrack() {
    if (this.tracks.length === 0) return;
    
    if (this.shuffleMode) {
      this.currentTrackIndex = Math.floor(Math.random() * this.tracks.length);
    } else {
      this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    }
    this.loadTrack(this.currentTrackIndex);
    if (this.isPlaying) {
      setTimeout(() => this.play(), 500); // Wait for iframe load
    }
  }

  nextTrack() {
    if (this.tracks.length === 0) return;
    
    if (this.shuffleMode) {
      this.currentTrackIndex = Math.floor(Math.random() * this.tracks.length);
    } else {
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    }
    this.loadTrack(this.currentTrackIndex);
    if (this.isPlaying) {
      setTimeout(() => this.play(), 500); // Wait for iframe load
    }
  }

  toggleShuffle() {
    this.shuffleMode = !this.shuffleMode;
    this.shuffleBtn.classList.toggle('active', this.shuffleMode);
    this.shuffleBtn.setAttribute('aria-pressed', this.shuffleMode);
  }

  toggleRepeat() {
    this.repeatMode = !this.repeatMode;
    this.repeatBtn.classList.toggle('active', this.repeatMode);
    this.repeatBtn.setAttribute('aria-pressed', this.repeatMode);
  }

  setVolume(volume) {
    this.volume = parseFloat(volume);
    this.volumeSlider.value = this.volume;
    
    try {
      const volumeSlider = this.iframe.contentWindow.document.querySelector('.Root__now-playing-bar input[aria-label="Volume"]');
      if (volumeSlider) {
        volumeSlider.value = this.volume;
        volumeSlider.dispatchEvent(new Event('input', { bubbles: true }));
      }
    } catch (e) {
      console.error('Error setting volume:', e);
    }
    
    // Update volume icon
    const volIcon = this.volumeSlider.previousElementSibling.querySelector('i');
    if (this.volume <= 0) {
      volIcon.className = 'fas fa-volume-mute';
    } else if (this.volume < 0.5) {
      volIcon.className = 'fas fa-volume-down';
    } else {
      volIcon.className = 'fas fa-volume-up';
    }
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
    this.toggleBtn.setAttribute('aria-expanded', this.playerElement.classList.contains('active'));
  }

  updatePlayerState() {
    // Clear previous interval if exists
    if (this.playerStateInterval) {
      clearInterval(this.playerStateInterval);
    }
    
    // Periodically check player state
    this.playerStateInterval = setInterval(() => {
      try {
        const playButton = this.iframe.contentWindow.document.querySelector('.Root__now-playing-bar button[data-testid="control-button-playpause"]');
        if (playButton) {
          const isPaused = playButton.getAttribute('aria-label')?.toLowerCase().includes('play');
          if (isPaused && this.isPlaying) {
            this.isPlaying = false;
            this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
            cancelAnimationFrame(this.progressAnimation);
          } else if (!isPaused && !this.isPlaying) {
            this.isPlaying = true;
            this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            this.updateProgress();
          }
        }
      } catch (e) {
        // Cross-origin errors
      }
    }, 1000);
  }

  // Public method to add tracks by Spotify URI
  addTrack(spotifyUri, title = '', artist = '', coverArt = '') {
    // Extract track ID from various Spotify URL formats
    let trackId = '';
    
    // URI format: spotify:track:11dFghVXANMlKmJXsNCbNl
    if (spotifyUri.startsWith('spotify:track:')) {
      trackId = spotifyUri.split(':')[2];
    } 
    // URL format: https://open.spotify.com/track/11dFghVXANMlKmJXsNCbNl
    else if (spotifyUri.includes('open.spotify.com/track/')) {
      trackId = spotifyUri.split('track/')[1].split('?')[0];
    }
    // Embed format: https://open.spotify.com/embed/track/11dFghVXANMlKmJXsNCbNl
    else if (spotifyUri.includes('embed/track/')) {
      trackId = spotifyUri.split('embed/track/')[1].split('?')[0];
    }
    
    if (trackId) {
      const newTrack = {
        title: title || `Track ${this.tracks.length + 1}`,
        artist: artist || 'Unknown Artist',
        spotifyUri: `spotify:track:${trackId}`,
        coverArt: coverArt || 'https://i.scdn.co/image/ab67616d0000b273b1d944dd406d5b0e461ad155' // Default cover
      };
      
      this.tracks.push(newTrack);
      
      // If this is the first track, load it
      if (this.tracks.length === 1) {
        this.loadTrack(0);
      }
      
      return true;
    }
    
    return false;
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
        this.coverElement.alt = '';
        this.progressBar.style.width = '0%';
        this.currentTimeElement.textContent = '0:00';
        this.durationElement.textContent = '0:00';
      }
      return true;
    }
    return false;
  }
}

// Add CSS styles dynamically
const addSpotifyPlayerStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .spotify-player {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #181818;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      z-index: 1000;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }
    
    .spotify-player.active {
      transform: translateY(0);
    }
    
    .spotify-player.mobile {
      padding-bottom: env(safe-area-inset-bottom);
    }
    
    .spotify-player button {
      background: none;
      border: none;
      color: white;
      font-size: 16px;
      padding: 10px;
      cursor: pointer;
      outline: none;
    }
    
    .spotify-player button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .spotify-player button.active {
      color: #1DB954;
    }
    
    .controls {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }
    
    .track-info {
      display: flex;
      align-items: center;
      padding: 10px;
    }
    
    .cover-container {
      width: 50px;
      height: 50px;
      margin-right: 15px;
    }
    
    .spotify-cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .text-info {
      flex: 1;
      overflow: hidden;
    }
    
    .spotify-title {
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .spotify-artist {
      font-size: 0.9em;
      color: #b3b3b3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .progress-container {
      display: flex;
      align-items: center;
      padding: 0 10px 10px;
    }
    
    .progress-bar-container {
      flex: 1;
      margin: 0 10px;
      height: 4px;
      background: #535353;
      border-radius: 2px;
      cursor: pointer;
    }
    
    .progress-bar {
      position: relative;
      height: 100%;
      background: #535353;
      border-radius: 2px;
    }
    
    .progress-fill {
      height: 100%;
      width: 0%;
      background: #b3b3b3;
      border-radius: 2px;
      transition: width 0.1s linear;
    }
    
    .progress-container span {
      font-size: 0.8em;
      color: #b3b3b3;
      min-width: 40px;
      text-align: center;
    }
    
    .volume-container {
      display: flex;
      align-items: center;
      padding: 0 10px 10px;
    }
    
    .volume-container input[type="range"] {
      flex: 1;
      margin: 0 10px;
      -webkit-appearance: none;
      height: 4px;
      background: #535353;
      border-radius: 2px;
      outline: none;
    }
    
    .volume-container input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 12px;
      height: 12px;
      background: white;
      border-radius: 50%;
      cursor: pointer;
    }
    
    #spotifyIframeContainer {
      display: none;
    }
    
    @media (max-width: 768px) {
      .spotify-player {
        padding-bottom: env(safe-area-inset-bottom);
      }
      
      .controls button {
        padding: 15px;
      }
    }
  `;
  document.head.appendChild(style);
};

// Initialize Spotify Player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add styles first
  addSpotifyPlayerStyles();
  
  // Then initialize player
  const spotifyPlayer = new SpotifyPlayer();
  
  // Expose player to window for debugging or additional control
  window.spotifyPlayer = spotifyPlayer;
  
  // Example: Add a track by URL
  /*
  spotifyPlayer.addTrack(
    'https://open.spotify.com/track/5FWpId5TRidgoNdnuctomr',
    'Custom Track',
    'Custom Artist',
    'https://i.scdn.co/image/ab67616d0000b273...'
  );
  */
});
