// Game State Manager
class GameState {
  constructor() {
    this.player = null;
    this.pets = [];
    this.selectedPet = null;
    this.onlinePlayers = [];
    this.trades = [];
    this.isLoggedIn = false;
  }

  setPlayer(playerData) {
    this.player = playerData;
    this.isLoggedIn = true;
  }

  setPets(pets) {
    this.pets = pets;
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  updateCoins(amount) {
    if (this.player) {
      this.player.coins = amount;
    }
  }

  updateLevel(level) {
    if (this.player) {
      this.player.level = level;
    }
  }

  setOnlinePlayers(players) {
    this.onlinePlayers = players;
  }

  addOnlinePlayer(player) {
    const index = this.onlinePlayers.findIndex(p => p.userId === player.userId);
    if (index === -1) {
      this.onlinePlayers.push(player);
    }
  }

  removeOnlinePlayer(playerId) {
    this.onlinePlayers = this.onlinePlayers.filter(p => p.userId !== playerId);
  }

  updatePlayerPosition(playerId, position) {
    const player = this.onlinePlayers.find(p => p.userId === playerId);
    if (player) {
      player.position = position;
    }
  }

  setTrades(trades) {
    this.trades = trades;
  }

  addTrade(trade) {
    this.trades.push(trade);
  }
}

const gameState = new GameState();

// Game Engine
class GameEngine {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.isRunning = false;
    this.animationId = null;
  }

  start() {
    this.isRunning = true;
    this.gameLoop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  gameLoop = () => {
    if (!this.isRunning) return;

    this.update();
    this.render();

    this.animationId = requestAnimationFrame(this.gameLoop);
  };

  update() {
    // Game logic updates
  }

  render() {
    renderGameWorld(this.ctx, this.canvas);
  }
}

const gameEngine = new GameEngine();
