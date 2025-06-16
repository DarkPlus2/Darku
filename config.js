const config = {
  user: {
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
    { name: "Developer", icon: "fas fa-code", title: "Active Developer" }
  ],

  tags: [
    { name: "Booster", icon: "fas fa-rocket", type: "booster" },
    { name: "Admin", icon: "fas fa-shield-alt", type: "admin" },
    { name: "Moderator", icon: "fas fa-gavel", type: "moderator" }
  ],

  socials: [
    { name: "GitHub", icon: "fab fa-github", url: "https://github.com" },
    { name: "Twitter", icon: "fab fa-twitter", url: "https://twitter.com" },
    { name: "YouTube", icon: "fab fa-youtube", url: "https://youtube.com" },
    { name: "Twitch", icon: "fab fa-twitch", url: "https://twitch.tv" },
    { name: "Steam", icon: "fab fa-steam", url: "https://steamcommunity.com" }
  ],

  connections: [
    { name: "GitHub", icon: "fab fa-github", username: "@ultimateuser" },
    { name: "Twitter", icon: "fab fa-twitter", username: "@ultimateuser" },
    { name: "Spotify", icon: "fab fa-spotify", username: "Ultimate Listener" },
    { name: "Steam", icon: "fab fa-steam", username: "ultimate_gamer" }
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

// Spotify configuration
const spotifyConfig = {
  showPlayer: false,
  currentTrack: {
    title: "Never Gonna Give You Up",
    artist: "Rick Astley",
    duration: 212, // in seconds
    coverArt: "https://i.scdn.co/image/ab67616d0000b273c8a11e48c91a982d086afc69"
  },
  playlist: [
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      duration: 200,
      coverArt: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36"
    },
    {
      title: "Dance Monkey",
      artist: "Tones and I",
      duration: 210,
      coverArt: "https://i.scdn.co/image/ab67616d0000b273a935e468a2e54d8e1f1eac7c"
    }
  ]
};

// Guilds configuration
const guildsConfig = {
  servers: [
    {
      name: "Ultimate Server",
      icon: "https://cdn.discordapp.com/icons/123456789012345678/a_abcdef1234567890abcdef1234567890.webp?size=256",
      members: 5678,
      online: 1234
    },
    {
      name: "Gaming Hub",
      icon: "https://cdn.discordapp.com/icons/987654321098765432/b_abcdef1234567890abcdef1234567890.webp?size=256",
      members: 8901,
      online: 3456
    },
    {
      name: "Development",
      icon: "https://cdn.discordapp.com/icons/123123123123123123/c_abcdef1234567890abcdef1234567890.webp?size=256",
      members: 1234,
      online: 567
    }
  ]
};
