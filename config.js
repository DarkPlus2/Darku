const config = {
  user: {
    username: "DarkPlusX",
    discriminator: "9292",
    avatar: "https://cdn.discordapp.com/avatars/1186206505658220597/2cde8977caa1d17284266344f85db0bc.webp?size=1024",
    status: "dnd",
    bio: "Discord enthusiast | Web Developer | Open Source Contributor | Coffee Lover | Building awesome stuff for the community",
    customStatus: {
      emoji: "👋🏻",
      text: "Welcome To Dark's Profile"
    }
  },

  badges: [
    { name: "Staff", icon: "fas fa-star", title: "Discord Staff" },
    { name: "Partner", icon: "fas fa-check", title: "Partnered Server Owner" },
    { name: "HypeSquad", icon: "fas fa-bolt", title: "HypeSquad Events" },
    { name: "BugHunter", icon: "fas fa-bug", title: "Bug Hunter Level 2" },
    { name: "EarlySupporter", icon: "fas fa-heart", title: "Early Supporter" },
    { name: "Developer", icon: "fas fa-code", title: "Active Developer" }
  ],

  tags: [
    { name: "Booster", icon: "fas fa-rocket", type: "booster" },
    { name: "Admin", icon: "fas fa-shield-alt", type: "admin" },
    { name: "Moderator", icon: "fas fa-gavel", type: "moderator" }
  ],

  socials: [
    { name: "GitHub", icon: "fab fa-github", url: "https://github.com/DarkPlus2" },
    { name: "YouTube", icon: "fab fa-youtube", url: "https://youtube.com/@darkplusx" },
    { name: "Xbox", icon: "fab fa-xbox", url: "https://www.xbox.com/en-US/play/user/DarkPlusX2" }
  ],

  connections: [
    { name: "GitHub", icon: "fab fa-github", username: "@DarkPlus2" },
    { name: "Spotify", icon: "fab fa-spotify", username: "DarkPlusX" },
    { name: "Crunchyroll", icon: "fas fa-fire", username: "The54Dark" },
    { name: "Xbox", icon: "fab fa-xbox", username: "DarkPlusX2" }
  ]
};

// Themes array
const themes = [
  { name: "default", primary: "#7289DA", background: "#2C2F33", card: "#23272A" },
  { name: "dark", primary: "#4E5D94", background: "#1A1B1E", card: "#101113" },
  { name: "light", primary: "#5865F2", background: "#F9FAFB", card: "#FFFFFF" },
  { name: "pink", primary: "#FF4D9E", background: "#1E1F24", card: "#2A2B31" },
  { name: "purple", primary: "#B388FF", background: "#1E1F24", card: "#292B33" },
  { name: "ultimate", primary: "#FF3366", background: "#121212", card: "#1E1E2E" },
  { name: "cyberpunk", primary: "#00FFF7", background: "#0F0F1A", card: "#1A1A2E" },
  { name: "ocean", primary: "#1CA8DD", background: "#0B1D2B", card: "#132E40" },
  { name: "forest", primary: "#34C759", background: "#0F1C12", card: "#1A2B20" },
  { name: "sunset", primary: "#FF6B6B", background: "#2F1B28", card: "#3A2231" }
];

window.themes = themes;

// Guilds configuration
const guildsConfig = {
  servers: [
    {
      name: "Darkness",
      icon: "https://cdn.discordapp.com/icons/1291767077291429930/169a10e1d417375e67a463476881722a.webp?size=256",
      members: 1258,
      online: 146
    },
    {
      name: "Celestial Nexus",
      icon: "https://cdn.discordapp.com/icons/1368606209720189109/ec320830cb4981fb5e23200b0a404337.webp?size=256",
      members: 59,
      online: 19
    }
  ]
};
