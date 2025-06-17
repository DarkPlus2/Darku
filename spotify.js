// Ultimate Spotify Player with Embed Integration
class SpotifyPlayer {
  constructor() {
    // Player state
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.volume = 0.7;
    this.shuffleMode = false;
    this.repeatMode = false;
    this.playerReady = false;
    
    // Spotify embed iframe
    this.iframe = null;
    this.iframeReady = false;
    
    // Track playlist with Spotify URIs
    this.tracks = [
      {
        title: "MONTAGEM NEBULA - SLOWED",
        artist: "Rushex, MONTAGEM",
        spotifyUri: "https://open.spotify.com/track/5FWpId5TRidgoNdnuctomr",
        coverArt: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36"
      },
      {
        title: "Dance Monkey",
        artist: "Tones and I",
        spotifyUri: "https://open.spotify.com/track/166BJ1qwh0uxjj03XBetnq",
        coverArt: "https://i.scdn.co/image/ab67616d0000b273a935e468a2e54d8e1f1eac7c"
      },
      {
        title: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        spotifyUri: "https://open.spotify.com/track/2FnkrCrbXJuebXxnVtXiHI",
        coverArt: "https://i.scdn.co/image/ab67616d0000b273d8cc2281fcd4519ca020926b"
      }
    ];

    this.initElements();
    this.initEvents();
    this.initSpotifyPlayer();
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
    this.iframeContainer = document.getElementById('spotifyIframeContainer');
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
    if (this.volumeSlider) {
      this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
    }
    
    // Handle tab visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.isPlaying) {
        this.pause();
      }
    });
    
    // Mobile touch events for progress bar
    this.progressBar.parentElement.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.progressBar.parentElement.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
    this.progressBar.parentElement.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
  }

  initSpotifyPlayer() {
    // Create Spotify iframe
    this.iframe = document.createElement('iframe');
    this.iframe.id = 'spotifyIframe';
    this.iframe.src = `https://open.spotify.com/embed/track/${this.tracks[0].spotifyUri.split(':')[2]}`;
    this.iframe.width = '100%';
    this.iframe.height = '80';
    this.iframe.frameBorder = '0';
    this.iframe.allow = 'encrypted-media';
    this.iframe.style.display = 'none';
    this.iframeContainer.appendChild(this.iframe);
    
    // Poll for player readiness
    this.checkPlayerReady();
  }

  checkPlayerReady() {
    if (this.iframe.contentWindow && this.iframe.contentWindow.document) {
      this.iframeReady = true;
      this.loadTrack(this.currentTrackIndex);
      this.updatePlayerState();
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
    this.progressBar.style.width = '0%';
    this.currentTimeElement.textContent = '0:00';
    
    // Update iframe source
    this.iframe.src = `https://open.spotify.com/embed/track/${track.spotifyUri.split(':')[2]}?utm_source=generator`;
    
    // Show loading state
    this.playBtn.disabled = true;
    this.playBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
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

  seek(e) {
    if (!this.iframeReady) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentClicked = clickPosition / progressBar.offsetWidth;
    
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
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.touches[0].clientX - rect.left;
    const percentClicked = clickPosition / progressBar.offsetWidth;
    this.seek({ currentTarget: progressBar, clientX: e.touches[0].clientX });
    e.preventDefault();
  }

  handleTouchMove(e) {
    const progressBar = e.currentTarget.parentElement;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.touches[0].clientX - rect.left;
    const percentClicked = Math.max(0, Math.min(1, clickPosition / progressBar.offsetWidth));
    this.progressBar.style.width = `${percentClicked * 100}%`;
    this.currentTimeElement.textContent = this.formatTime(percentClicked * this.getTrackDuration());
    e.preventDefault();
  }

  handleTouchEnd(e) {
    this.seek({ currentTarget: e.currentTarget.parentElement, clientX: e.changedTouches[0].clientX });
  }

  prevTrack() {
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
  }

  toggleRepeat() {
    this.repeatMode = !this.repeatMode;
    this.repeatBtn.classList.toggle('active', this.repeatMode);
  }

  setVolume(volume) {
    this.volume = volume;
    try {
      const volumeSlider = this.iframe.contentWindow.document.querySelector('.Root__now-playing-bar input[aria-label="Volume"]');
      if (volumeSlider) {
        volumeSlider.value = volume;
        volumeSlider.dispatchEvent(new Event('input', { bubbles: true }));
      }
    } catch (e) {
      console.error('Error setting volume:', e);
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
  }

  updatePlayerState() {
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
      }
    }
  }
}

// Initialize Spotify Player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
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
