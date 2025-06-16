const config = {
  // User Configuration
  user: {
    id: "123456789012345678",
    username: "UltimateUser",
    discriminator: "0001",
    avatar: "https://cdn.discordapp.com/avatars/123456789012345678/a_abcdef1234567890abcdef1234567890.webp?size=512",
    status: "online", // online, idle, dnd, offline
    bio: "Discord enthusiast | Web Developer | Open Source Contributor | Coffee Lover | Building awesome stuff for the community",
    customStatus: {
      emoji: "🎮",
      text: "Playing Ultimate Discord Profile"
    }
  },

  // Badges Configuration
  badges: [
    { name: "Staff", icon: "fas fa-star", title: "Discord Staff" },
    { name: "Partner", icon: "fas fa-check", title: "Partnered Server Owner" },
    { name: "HypeSquad", icon: "fas fa-bolt", title: "HypeSquad Events" },
    { name: "BugHunter", icon: "fas fa-bug", title: "Bug Hunter Level 2" },
    { name: "EarlySupporter", icon: "fas fa-heart", title: "Early Supporter" },
    { name: "Developer", icon: "fas fa-code", title: "Active Developer" }
  ],

  // Tags Configuration
  tags: [
    { name: "Booster", icon: "fas fa-rocket", type: "booster" },
    { name: "Admin", icon: "fas fa-shield-alt", type: "admin" },
    { name: "Moderator", icon: "fas fa-gavel", type: "moderator" }
  ],

  // Activity Configuration
  activity: {
    name: "Ultimate Discord",
    state: "Playing for 2 hours",
    icon: "fas fa-gamepad",
    progress: {
      current: "1:23:45",
      end: "2:10:00",
      percentage: 65
    }
  },

  // Social Links Configuration
  socials: [
    { name: "GitHub", icon: "fab fa-github", url: "https://github.com" },
    { name: "Twitter", icon: "fab fa-twitter", url: "https://twitter.com" },
    { name: "YouTube", icon: "fab fa-youtube", url: "https://youtube.com" },
    { name: "Twitch", icon: "fab fa-twitch", url: "https://twitch.tv" },
    { name: "Steam", icon: "fab fa-steam", url: "https://steamcommunity.com" }
  ],

  // Connections Configuration
  connections: [
    { name: "GitHub", icon: "fab fa-github", username: "@ultimateuser" },
    { name: "Twitter", icon: "fab fa-twitter", username: "@ultimateuser" },
    { name: "Spotify", icon: "fab fa-spotify", username: "Ultimate Listener" },
    { name: "Steam", icon: "fab fa-steam", username: "ultimate_gamer" }
  ],

  // Server Info Configuration
  serverInfo: {
    name: "Ultimate Server",
    icon: "https://cdn.discordapp.com/icons/123456789012345678/a_abcdef1234567890abcdef1234567890.webp?size=256",
    members: {
      online: 1234,
      total: 5678
    }
  },

  // Theme Configuration
  themes: [
    { name: "default", primary: "#5865F2", background: "#313338", card: "#232428" },
    { name: "dark", primary: "#5865F2", background: "#1e1f22", card: "#111214" },
    { name: "light", primary: "#5865F2", background: "#f2f3f5", card: "#ffffff" },
    { name: "pink", primary: "#EB459E", background: "#2b2d31", card: "#1e1f22" },
    { name: "purple", primary: "#9C84EF", background: "#2b2d31", card: "#1e1f22" }
  ],

  // Animation Configuration
  animations: {
    statusRipple: true,
    typingEffect: true,
    cursorFollower: true
  }
};

// Export the config if using modules
// export default config;
