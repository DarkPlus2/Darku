export const config = {
  // Profile Configuration
  profile: {
    id: "YOUR_DISCORD_ID",
    username: "YourName",
    discriminator: "0000",
    avatar: "YOUR_AVATAR_HASH",
    bio: "🌟 Full-stack Developer | Open Source Contributor | UI/UX Designer | Coffee Enthusiast",
    status: {
      text: "Working on my next big project!",
      emoji: "fa-smile"
    },
    activity: {
      name: "Visual Studio Code",
      details: "Working on profile-card.html",
      icon: "fa-code"
    }
  },

  // Badges Configuration
  badges: [
    { icon: "fa-check", tooltip: "Discord Staff" },
    { icon: "fa-heart", tooltip: "Partnered Server Owner" },
    { icon: "fa-shield-alt", tooltip: "Certified Moderator" },
    { icon: "fa-bolt", tooltip: "Early Supporter" }
  ],

  // Tags Configuration
  tags: ["developer", "opensource", "javascript", "design", "webdev"],

  // Social Links Configuration
  socials: [
    { platform: "discord", url: "https://discord.com/users/YOUR_ID", icon: "fab fa-discord" },
    { platform: "github", url: "https://github.com/YOUR_GITHUB", icon: "fab fa-github" },
    { platform: "twitter", url: "https://twitter.com/YOUR_TWITTER", icon: "fab fa-twitter" },
    { platform: "youtube", url: "https://youtube.com/YOUR_YOUTUBE", icon: "fab fa-youtube" },
    { platform: "twitch", url: "https://twitch.tv/YOUR_TWITCH", icon: "fab fa-twitch" }
  ],

  // Connections Configuration
  connections: [
    { platform: "github", username: "@yourusername", icon: "fab fa-github" },
    { platform: "twitter", username: "@yourhandle", icon: "fab fa-twitter" },
    { platform: "steam", username: "gamertag", icon: "fab fa-steam" }
  ],

  // Theme Configuration
  themes: [
    { name: "default", primary: "#5865F2", secondary: "#ed64a6", background: "#1e1e2e" },
    { name: "dark", primary: "#5865F2", secondary: "#ed64a6", background: "#121218" },
    { name: "light", primary: "#5865F2", secondary: "#ed64a6", background: "#f5f5fa" },
    { name: "pink", primary: "#ff73b3", secondary: "#ff4081", background: "#1e0e1a" },
    { name: "green", primary: "#4caf50", secondary: "#8bc34a", background: "#0e1e10" },
    { name: "purple", primary: "#9c27b0", secondary: "#673ab7", background: "#140a1a" }
  ],

  // Animation Configuration
  animations: {
    particleCount: 20,
    floatDuration: { min: 15, max: 30 },
    statusCycleInterval: 5000,
    avatarFloat: true
  }
};
