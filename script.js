document.addEventListener('DOMContentLoaded', function() {
  // Theme switching functionality
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const theme = this.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      
      // Update active button state
      themeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'default';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Set active button for saved theme
  document.querySelector(`.theme-btn[data-theme="${savedTheme}"]`).classList.add('active');

  // Create animated background particles
  const background = document.querySelector('.background-animation');
  const particleCount = 15;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 5px and 20px
    const size = Math.random() * 15 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation duration between 10s and 30s
    const duration = Math.random() * 20 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay
    particle.style.animationDelay = `${Math.random() * 10}s`;
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    
    background.appendChild(particle);
  }

  // Add hover effect to social links
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const icon = this.querySelector('i');
      icon.style.transform = 'scale(1.2)';
    });
    
    link.addEventListener('mouseleave', function() {
      const icon = this.querySelector('i');
      icon.style.transform = 'scale(1)';
    });
  });

  // Status cycling animation
  const status = document.querySelector('.status');
  const statuses = ['online', 'idle', 'dnd', 'offline'];
  let currentStatus = 0;
  
  setInterval(() => {
    currentStatus = (currentStatus + 1) % statuses.length;
    status.className = 'status';
    status.classList.add(statuses[currentStatus]);
    status.title = statuses[currentStatus].charAt(0).toUpperCase() + statuses[currentStatus].slice(1);
  }, 5000);
  
  // Initial status
  status.classList.add('online');
  status.title = 'Online';
});
