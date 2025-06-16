const config = {
  user: {
    id: "123456789012345678",
    username: "UltimateUser",
    discriminator: "0001",
    avatar: "https://cdn.discordapp.com/avatars/123456789012345678/a_abcdef1234567890abcdef1234567890.webp?size=512",
    status: "online",
    bio: "Discord enthusiast | Web Developer | Open Source Contributor | Coffee Lover | Building awesome stuff for the community",
    customStatus: {
      emoji: "🎮",
      text: "Playing Ultimate Discord Profile"
    }
  },

  badges: [
    { name: "Staff", icon: "fas fa-star", title: "Discord Staff" },
    { name: "Partner", icon: "fas fa-check", title: "Partnered Server Owner" },
    { name: "HypeSquad", icon: "fas fa-bolt", title: "HypeSquad Events" },
    { name: "BugHunter", icon: "fas fa-bug", title: "Bug Hunter Level 2" },
    { name: "EarlySupporter", icon: "fas fa-heart", title: "Early Supporter" },
    { name: "Developer", icon: "fas fa-code", title: "Active Developer" },
    { name: "VerifiedBot", icon: "fas fa-robot", title: "Verified Bot Developer" },
    { name: "ModAlumni", icon: "fas fa-shield-alt", title: "Moderator Programs Alumni" }
  ],

  tags: [
    { name: "Booster", icon: "fas fa-rocket", type: "booster" },
    { name: "Admin", icon: "fas fa-shield-alt", type: "admin" },
    { name: "Moderator", icon: "fas fa-gavel", type: "moderator" },
    { name: "Owner", icon: "fas fa-crown", type: "owner" }
  ],

  spotify: {
    song: "Never Gonna Give You Up",
    artist: "Rick Astley",
    duration: "3:32",
    showPlayer: false
  },

  socials: [
    { name: "GitHub", icon: "fab fa-github", url: "https://github.com" },
    { name: "Twitter", icon: "fab fa-twitter", url: "https://twitter.com" },
    { name: "YouTube", icon: "fab fa-youtube", url: "https://youtube.com" },
    { name: "Twitch", icon: "fab fa-twitch", url: "https://twitch.tv" },
    { name: "Steam", icon: "fab fa-steam", url: "https://steamcommunity.com" },
    { name: "Instagram", icon: "fab fa-instagram", url: "https://instagram.com" },
    { name: "Reddit", icon: "fab fa-reddit", url: "https://reddit.com" }
  ],

  connections: [
    { name: "GitHub", icon: "fab fa-github", username: "@ultimateuser" },
    { name: "Twitter", icon: "fab fa-twitter", username: "@ultimateuser" },
    { name: "Spotify", icon: "fab fa-spotify", username: "Ultimate Listener" },
    { name: "Steam", icon: "fab fa-steam", username: "ultimate_gamer" },
    { name: "Xbox", icon: "fab fa-xbox", username: "UltimateGamer123" },
    { name: "Battle.net", icon: "fab fa-battle-net", username: "Ultimate#1234" }
  ],

  servers: [
    {
      name: "Ultimate Server",
      icon: "https://cdn.discordapp.com/icons/123456789012345678/a_abcdef1234567890abcdef1234567890.webp?size=256",
      members: {
        online: 1234,
        total: 5678
      }
    },
    {
      name: "Gaming Hub",
      icon: "https://cdn.discordapp.com/icons/987654321098765432/b_abcdef1234567890abcdef1234567890.webp?size=256",
      members: {
        online: 3456,
        total: 8901
      }
    }
  ],

  themes: [
    { name: "default", primary: "#5865F2", background: "#313338", card: "#232428" },
    { name: "dark", primary: "#5865F2", background: "#1e1f22", card: "#111214" },
    { name: "light", primary: "#5865F2", background: "#f2f3f5", card: "#ffffff" },
    { name: "pink", primary: "#EB459E", background: "#2b2d31", card: "#1e1f22" },
    { name: "purple", primary: "#9C84EF", background: "#2b2d31", card: "#1e1f22" },
    { name: "ultimate", primary: "#FF3366", background: "#1a1a2e", card: "#16213e" }
  ]
};
