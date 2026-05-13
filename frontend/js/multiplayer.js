// Socket.IO Client
class MultiplayerManager {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect() {
    this.socket = io(GAME_CONFIG.SERVER_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('✅ Connected to server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
      this.isConnected = false;
    });

    this.socket.on('playerJoined', (data) => {
      gameState.addOnlinePlayer(data);
      console.log(`${data.username} joined the plaza`);
    });

    this.socket.on('playerMoved', (data) => {
      gameState.updatePlayerPosition(data.playerId, data.position);
    });

    this.socket.on('playerDisconnected', (data) => {
      gameState.removeOnlinePlayer(data.playerId);
      console.log(`${data.username} left the plaza`);
    });

    this.socket.on('onlinePlayersList', (players) => {
      gameState.setOnlinePlayers(players);
    });

    this.socket.on('newMessage', (data) => {
      addChatMessage(data.username, data.message);
    });

    this.socket.on('receivedTradeRequest', (data) => {
      showTradeNotification(data);
    });

    this.socket.on('announcement', (data) => {
      showAnnouncement(data.message);
    });
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  playerJoin(userId, username) {
    this.emit('playerJoin', { userId, username });
  }

  movePlayer(userId, position) {
    this.emit('playerMove', { userId, position });
  }

  sendChatMessage(userId, username, message) {
    this.emit('chatMessage', { userId, username, message });
  }

  sendTradeRequest(receiverSocketId, tradeData) {
    this.emit('tradeRequest', { receiverSocketId, ...tradeData });
  }

  announceRareHatch(username, petName, rarity) {
    this.emit('rareHatch', { username, petName, rarity });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

const multiplayerManager = new MultiplayerManager();
