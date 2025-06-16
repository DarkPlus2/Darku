export const config = {
  // Profile Configuration
  profile: {
    id: "1186206505658220597",
    username: "DarkPlusX",
    discriminator: "9292",
    avatar: "f2f0804d53d3863c8646baca897b7514",
    bio: "🌟 Full-stack Developer | Open Source Contributor | UI/UX Designer | Coffee Enthusiast",
    status: {
      text: "Working on my next big project!",
      emoji: "fa-smile"
    },
    activity: {
      name: "Minecraft",
      details: "Playing single player",
      icon: "fa-minecraft"
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
  tags: ["Minecraft", "Survival", "JavaScript"],

  // Social Links Configuration
  socials: [
    { platform: "discord", url: "https://discord.com/users/1186206505658220597", icon: "fab fa-discord" },
    { platform: "github", url: "https://github.com/darkplus2", icon: "fab fa-github" },
    { platform: "youtube", url: "https://youtube.com/@darkplusx", icon: "fab fa-youtube" },
    { platform: "youtube", url: "https://youtube.com/@lowx5", icon: "fab fa-twitch" }
  ],

  // Connections Configuration
  connections: [
    { platform: "github", username: "@darkplus2", icon: "fab fa-github" },
    { platform: "xbox", username: "@darkplusx2", icon: "fab fa-xbox" },
    { platform: "roblox", username: "darkplusx2", icon: "fab fa-roblox" }
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
