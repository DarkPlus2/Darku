document.addEventListener('DOMContentLoaded', function() {
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

  function changeTheme(theme) {
    const root = document.documentElement;
    
    switch(theme) {
      case 'dark':
        root.style.setProperty('--primary', '#5865F2');
        root.style.setProperty('--background', '#1e1f22');
        root.style.setProperty('--card-bg', '#111214');
        root.style.setProperty('--text-primary', '#dbdee1');
        root.style.setProperty('--text-secondary', '#a5a9ad');
        break;
      case 'light':
        root.style.setProperty('--primary', '#5865F2');
        root.style.setProperty('--background', '#f2f3f5');
        root.style.setProperty('--card-bg', '#ffffff');
        root.style.setProperty('--text-primary', '#060607');
        root.style.setProperty('--text-secondary', '#4e5058');
        break;
      case 'pink':
        root.style.setProperty('--primary', '#EB459E');
        root.style.setProperty('--background', '#2b2d31');
        root.style.setProperty('--card-bg', '#1e1f22');
        break;
      case 'purple':
        root.style.setProperty('--primary', '#9C84EF');
        root.style.setProperty('--background', '#2b2d31');
        root.style.setProperty('--card-bg', '#1e1f22');
        break;
      default: // Default theme
        root.style.setProperty('--primary', '#5865F2');
        root.style.setProperty('--background', '#313338');
        root.style.setProperty('--card-bg', '#232428');
        root.style.setProperty('--text-primary', '#F2F3F5');
        root.style.setProperty('--text-secondary', '#B5BAC1');
    }
  }

  // Animated status effect
  const statusRipple = document.querySelector('.status-ripple');
  
  function animateStatus() {
    statusRipple.style.animation = 'none';
    void statusRipple.offsetWidth; // Trigger reflow
    statusRipple.style.animation = 'ripple 1.5s infinite';
  }
  
  // Change status every 10 seconds for demo purposes
  setInterval(() => {
    const status = document.querySelector('.status');
    const statuses = ['online', 'idle', 'dnd', 'offline'];
    const colors = {
      'online': '#3BA55D',
      'idle': '#FAA81A',
      'dnd': '#ED4245',
      'offline': '#747F8D'
    };
    
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    status.style.backgroundColor = colors[randomStatus];
    statusRipple.style.backgroundColor = colors[randomStatus];
    status.setAttribute('title', randomStatus.charAt(0).toUpperCase() + randomStatus.slice(1));
    animateStatus();
  }, 10000);

  // Hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('.badge, .social, .connection, .server-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
      cursorFollower.style.opacity = '0.5';
    });
    
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.opacity = '1';
    });
  });

  // Simulate typing effect for bio
  const bio = document.querySelector('.bio');
  const bioText = "Discord enthusiast | Web Developer | Open Source Contributor | Coffee Lover | Building awesome stuff for the community";
  let i = 0;
  
  function typeWriter() {
    if (i < bioText.length) {
      bio.textContent += bioText.charAt(i);
      i++;
      setTimeout(typeWriter, Math.random() * 50 + 20);
    }
  }
  
  // Start typing after a short delay
  setTimeout(typeWriter, 1000);
});
