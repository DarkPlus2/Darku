class DiscordBot {
  constructor() {
    this.statusTypes = ['online', 'idle', 'dnd', 'offline'];
    this.statusColors = {
      online: '#3BA55D',
      idle: '#FAA81A',
      dnd: '#ED4245',
      offline: '#747F8D'
    };
    
    this.initElements();
    this.setRandomStatus();
    this.setStatusInterval();
  }

  initElements() {
    this.statusElement = document.querySelector('.status');
    this.statusRipple = document.querySelector('.status-ripple');
  }

  setRandomStatus() {
    const randomStatus = this.statusTypes[Math.floor(Math.random() * this.statusTypes.length)];
    const statusColor = this.statusColors[randomStatus];
    
    this.statusElement.style.backgroundColor = statusColor;
    this.statusRipple.style.backgroundColor = statusColor;
    this.statusElement.setAttribute('title', randomStatus.charAt(0).toUpperCase() + randomStatus.slice(1));
    
    // Reset animation
    this.statusRipple.style.animation = 'none';
    void this.statusRipple.offsetWidth;
    this.statusRipple.style.animation = 'ripple 1.5s infinite';
  }

  setStatusInterval() {
    setInterval(() => this.setRandomStatus(), 10000);
  }
}

// Initialize Discord Bot
document.addEventListener('DOMContentLoaded', () => {
  new DiscordBot();
});
