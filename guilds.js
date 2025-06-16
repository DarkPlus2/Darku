class GuildsDisplay {
  constructor() {
    this.guildsContainer = document.querySelector('.guilds-list');
    this.render();
  }

  render() {
    guildsConfig.servers.forEach(guild => {
      const guildElement = document.createElement('div');
      guildElement.className = 'guild-card';
      guildElement.innerHTML = `
        <img src="${guild.icon}" alt="${guild.name}" class="guild-icon">
        <div class="guild-info">
          <div class="guild-name">${guild.name}</div>
          <div class="guild-members">
            <i class="fas fa-user"></i>
            <span>${guild.online.toLocaleString()} online</span>
            <span>${guild.members.toLocaleString()} members</span>
          </div>
        </div>
      `;
      this.guildsContainer.appendChild(guildElement);
    });
  }
}

// Initialize Guilds Display
document.addEventListener('DOMContentLoaded', () => {
  new GuildsDisplay();
});
