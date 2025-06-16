import { config } from './config.js';

// DOM Elements
const elements = {
  avatar: document.querySelector('.avatar'),
  username: document.querySelector('.username-text'),
  discriminator: document.querySelector('.discriminator'),
  bio: document.querySelector('.bio'),
  statusEmoji: document.querySelector('.status-emoji'),
  statusText: document.querySelector('.status-text'),
  activityName: document.querySelector('.activity-name'),
  activityState: document.querySelector('.activity-state'),
  activityIcon: document.querySelector('.activity-icon-i'),
  badgesContainer: document.querySelector('.badges'),
  tagsContainer: document.querySelector('.tags'),
  socialsContainer: document.querySelector('.socials'),
  connectionsList: document.querySelector('.connections-list'),
  themeOptions: document.querySelector('.theme-options'),
  cursorFollower: document.querySelector('.cursor-follower'),
  status: document.querySelector('.status'),
  statusRipple: document.querySelector('.status-ripple'),
  avatarContainer: document.querySelector('.avatar-container')
};

// Initialize Profile
function initProfile() {
  // Set profile data
  elements.avatar.src = `https://cdn.discordapp.com/avatars/${config.profile.id}/${config.profile.avatar}.webp?size=512`;
  elements.username.textContent = config.profile.username;
  elements.discriminator.textContent = `#${config.profile.discriminator}`;
  elements.bio.textContent = config.profile.bio;
  
  // Set status
  elements.statusEmoji.className = `fas ${config.profile.status.emoji}`;
  elements.statusText.textContent = config.profile.status.text;
  
  // Set activity
  elements.activityName.textContent = config.profile.activity.name;
  elements.activityState.textContent = config.profile.activity.details;
  elements.activityIcon.className = `fas ${config.profile.activity.icon}`;
  
  // Create badges
  config.badges.forEach(badge => {
    const badgeElement = document.createElement('div');
    badgeElement.className = 'badge';
    badgeElement.innerHTML = `
      <i class="fas ${badge.icon}"></i>
      <span class="badge-tooltip">${badge.tooltip}</span>
    `;
    elements.badgesContainer.appendChild(badgeElement);
  });
  
  // Create tags
  config.tags.forEach(tag => {
    const tagElement = document.createElement('span');
    tagElement.textContent = `#${tag}`;
    elements.tagsContainer.appendChild(tagElement);
  });
  
  // Create social links
  config.socials.forEach(social => {
    const socialLink = document.createElement('a');
    socialLink.className = `social-link ${social.platform}`;
    socialLink.href = social.url;
    socialLink.target = '_blank';
    socialLink.title = social.platform.charAt(0).toUpperCase() + social.platform.slice(1);
    socialLink.innerHTML = `<i class="${social.icon}"></i>`;
    elements.socialsContainer.appendChild(socialLink);
  });
  
  // Create connections
  config.connections.forEach(connection => {
    const connectionElement = document.createElement('div');
    connectionElement.className = 'connection';
    connectionElement.innerHTML = `
      <div class="connection-icon">
        <i class="${connection.icon}"></i>
      </div>
      <div class="connection-name">${connection.platform.charAt(0).toUpperCase() + connection.platform.slice(1)}</div>
      <div class="connection-username">${connection.username}</div>
    `;
    elements.connectionsList.appendChild(connectionElement);
  });
}

// Initialize Themes
function initThemes() {
  config.themes.forEach(theme => {
    const themeOption = document.createElement('button');
    themeOption.className = 'theme-option';
    themeOption.style.background = theme.primary;
    themeOption.style.border = `2px solid ${theme.secondary}`;
    themeOption.dataset.theme = theme.name;
    themeOption.title = theme.name.charAt(0).toUpperCase() + theme.name.slice(1);
    
    themeOption.addEventListener('click', () => {
      setTheme(theme.name);
    });
    
    elements.themeOptions.appendChild(themeOption);
  });
}

// Set Theme
function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('theme', themeName);
  
  // Update particles color
  const theme = config.themes.find(t => t.name === themeName);
  document.documentElement.style.setProperty('--primary', theme.primary);
  document.documentElement.style.setProperty('--primary-rgb', hexToRgb(theme.primary));
  document.documentElement.style.setProperty('--secondary', theme.secondary);
  document.documentElement.style.setProperty('--secondary-rgb', hexToRgb(theme.secondary));
  document.documentElement.style.setProperty('--background', theme.background);
  document.documentElement.style.setProperty('--background-rgb', hexToRgb(theme.background));
}

// Hex to RGB Converter
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

// Initialize Background Particles
function initParticles() {
  const background = document.querySelector('.background-animation');
  
  for (let i = 0; i < config.animations.particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 5px and 20px
    const size = Math.random() * 15 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation duration
    const duration = Math.random() * 
      (config.animations.floatDuration.max - config.animations.floatDuration.min) + 
      config.animations.floatDuration.min;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay
    particle.style.animationDelay = `${Math.random() * 10}s`;
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    
    // Random blur
    particle.style.backdropFilter = `blur(${Math.random() * 3 + 1}px)`;
    
    background.appendChild(particle);
  }
}

// Initialize Status Animation
function initStatusAnimation() {
  const statuses = ['online', 'idle', 'dnd', 'offline'];
  let currentStatus = 0;
  
  setInterval(() => {
    currentStatus = (currentStatus + 1) % statuses.length;
    elements.status.className = 'status';
    elements.status.classList.add(statuses[currentStatus]);
    elements.status.title = statuses[currentStatus].charAt(0).toUpperCase() + statuses[currentStatus].slice(1);
    
    // Create ripple effect
    elements.statusRipple.className = 'status-ripple';
    elements.statusRipple.classList.add(statuses[currentStatus]);
    elements.statusRipple.style.animation = 'ripple 1s ease-out';
    
    setTimeout(() => {
      elements.statusRipple.style.animation = '';
    }, 1000);
  }, config.animations.statusCycleInterval);
}

// Initialize Custom Cursor
function initCustomCursor() {
  document.addEventListener('mousemove', (e) => {
    elements.cursorFollower.style.left = `${e.clientX}px`;
    elements.cursorFollower.style.top = `${e.clientY}px`;
  });
  
  // Cursor hover effects
  const interactiveElements = document.querySelectorAll(
    'a, button, .badge, .tags span, .social-link, .connection'
  );
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      elements.cursorFollower.style.width = '40px';
      elements.cursorFollower.style.height = '40px';
      elements.cursorFollower.style.background = 'rgba(var(--primary-rgb), 0.4)';
    });
    
    el.addEventListener('mouseleave', () => {
      elements.cursorFollower.style.width = '20px';
      elements.cursorFollower.style.height = '20px';
      elements.cursorFollower.style.background = 'rgba(var(--primary-rgb), 0.2)';
    });
  });
}

// Initialize Avatar Animation
function initAvatarAnimation() {
  if (config.animations.avatarFloat) {
    elements.avatarContainer.classList.add('floating');
  }
}

// Initialize App
function initApp() {
  // Load saved theme or use default
  const savedTheme = localStorage.getItem('theme') || 'default';
  setTheme(savedTheme);
  
  // Initialize components
  initProfile();
  initThemes();
  initParticles();
  initStatusAnimation();
  initCustomCursor();
  initAvatarAnimation();
}

// Start the app
document.addEventListener('DOMContentLoaded', initApp);
