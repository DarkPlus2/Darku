document.addEventListener('DOMContentLoaded', function() {
  // Initialize from config
  initializeProfile();
  
  // Cursor follower effect
  const cursorFollower = document.querySelector('.cursor-follower');
  
  document.addEventListener('mousemove', (e) => {
    cursorFollower.style.left = `${e.clientX}px`;
    cursorFollower.style.top = `${e.clientY}px`;
  });

  // Theme switching functionality
  const themeOptions = document.querySelectorAll('.theme-option');
  
  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.getAttribute('data-theme');
      changeTheme(theme);
    });
  });

  // Spotify player functionality
  const spotifyToggle = document.getElementById('spotifyToggle');
  const spotifyPlayer = document.getElementById('spotifyPlayer');
  const spotifyPlayBtn = document.getElementById('spotifyPlayBtn');
  const spotifyProgress = document.getElementById('spotifyProgress');
  const spotifyCurrentTime = document.getElementById('spotifyCurrentTime');
  
  let isPlaying = false;
  let progressInterval;
  let currentTime = 0;
  const totalDuration = 212; // 3:32 in seconds

  spotifyToggle.addEventListener('click', () => {
    spotifyPlayer.classList.toggle('active');
    spotifyToggle.innerHTML = spotifyPlayer.classList.contains('active') 
      ? '<i class="fab fa-spotify"></i> Hide Spotify Player' 
      : '<i class="fab fa-spotify"></i> Show Spotify Player';
  });

  spotifyPlayBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
      spotifyPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
      startProgress();
    } else {
      spotifyPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
      clearInterval(progressInterval);
    }
  });

  function startProgress() {
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
      if (currentTime >= totalDuration) {
        currentTime = 0;
        isPlaying = false;
        spotifyPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        clearInterval(progressInterval);
      } else {
        currentTime++;
        updateProgress();
      }
    }, 1000);
  }

  function updateProgress() {
    const progressPercent = (currentTime / totalDuration) * 100;
    spotifyProgress.style.width = `${progressPercent}%`;
    
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    spotifyCurrentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Live status updates
  const status = document.querySelector('.status');
  const statusRipple = document.querySelector('.status-ripple');
  const statuses = [
    { name: 'online', color: '#3BA55D' },
    { name: 'idle', color: '#FAA81A' },
    { name: 'dnd', color: '#ED4245' },
    { name: 'offline', color: '#747F8D' }
  ];
  
  function updateStatus() {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    status.style.backgroundColor = randomStatus.color;
    statusRipple.style.backgroundColor = randomStatus.color;
    status.setAttribute('title', randomStatus.name.charAt(0).toUpperCase() + randomStatus.name.slice(1));
    
    // Reset animation
    statusRipple.style.animation = 'none';
    void statusRipple.offsetWidth;
    statusRipple.style.animation = 'ripple 1.5s infinite';
  }
  
  // Change status every 10 seconds
  setInterval(updateStatus, 10000);
  updateStatus(); // Initial status

  // Hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('.badge, .social, .connection, .server-card, .tag, .spotify-btn');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(2.5)';
      cursorFollower.style.opacity = '0.4';
      cursorFollower.style.width = '40px';
      cursorFollower.style.height = '40px';
    });
    
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.opacity = '1';
      cursorFollower.style.width = '24px';
      cursorFollower.style.height = '24px';
    });
  });

  // Initialize profile from config
  function initializeProfile() {
    // User info
    document.querySelector('.username-text').textContent = config.user.username;
    document.querySelector('.discriminator').textContent = `#${config.user.discriminator}`;
    document.querySelector('.avatar').src = config.user.avatar;
    document.querySelector('.bio').textContent = config.user.bio;
    
    // Status
    document.querySelector('.status-emoji').textContent = config.user.customStatus.emoji;
    document.querySelector('.status-text').textContent = config.user.customStatus.text;
    
    // Spotify
    if (config.spotify.showPlayer) {
      spotifyPlayer.classList.add('active');
      spotifyToggle.innerHTML = '<i class="fab fa-spotify"></i> Hide Spotify Player';
    }
    
    document.querySelector('.spotify-title').textContent = config.spotify.song;
    document.querySelector('.spotify-artist').textContent = config.spotify.artist;
    document.querySelector('.spotify-progress-time span:last-child').textContent = config.spotify.duration;
  }

  function changeTheme(theme) {
    const root = document.documentElement;
    const themeConfig = config.themes.find(t => t.name === theme) || config.themes[0];
    
    root.style.setProperty('--primary', themeConfig.primary);
    root.style.setProperty('--background', themeConfig.background);
    root.style.setProperty('--card-bg', themeConfig.card);
    
    // Special case for ultimate theme
    if (theme === 'ultimate') {
      root.style.setProperty('--primary', '#FF3366');
      root.style.setProperty('--background', '#1a1a2e');
      root.style.setProperty('--card-bg', '#16213e');
      document.querySelector('.card::before').style.background = 'linear-gradient(90deg, #FF3366 0%, #FF8C42 100%)';
    }
  }
});
