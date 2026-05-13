const User = require('../models/User');
const Pet = require('../models/Pet');
const Chat = require('../models/Chat');
const Trade = require('../models/Trade');
const GAME_CONSTANTS = require('./constants');

let onlinePlayers = new Map();

const initializeSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('👤 Player connected:', socket.id);

    // Player joins
    socket.on('playerJoin', async (data) => {
      try {
        const { userId, username } = data;

        // Update user online status
        const user = await User.findByIdAndUpdate(
          userId,
          { isOnline: true, socketId: socket.id },
          { new: true }
        );

        onlinePlayers.set(socket.id, {
          userId,
          username,
          position: user.position,
          avatar: user.avatar,
        });

        socket.join('plaza');

        // Broadcast player joined
        io.to('plaza').emit('playerJoined', {
          playerId: userId,
          username,
          position: user.position,
          avatar: user.avatar,
        });

        // Send current players to new player
        socket.emit('onlinePlayersList', Array.from(onlinePlayers.values()));
      } catch (error) {
        console.error('Join error:', error);
      }
    });

    // Player movement
    socket.on('playerMove', (data) => {
      const { userId, position } = data;
      const player = onlinePlayers.get(socket.id);

      if (player) {
        player.position = position;
        io.to('plaza').emit('playerMoved', {
          playerId: userId,
          position,
        });
      }
    });

    // Global chat
    socket.on('chatMessage', async (data) => {
      try {
        const { userId, username, message } = data;

        if (message.length > 500) return;

        const chat = new Chat({
          sender: userId,
          senderUsername: username,
          message,
          channel: 'global',
        });

        await chat.save();

        io.to('plaza').emit('newMessage', {
          username,
          message,
          timestamp: new Date(),
        });
      } catch (error) {
        console.error('Chat error:', error);
      }
    });

    // Trade request
    socket.on('tradeRequest', async (data) => {
      try {
        const { receiverSocketId, ...tradeData } = data;
        io.to(receiverSocketId).emit('receivedTradeRequest', tradeData);
      } catch (error) {
        console.error('Trade request error:', error);
      }
    });

    // Server announcement
    socket.on('rareHatch', async (data) => {
      const { username, petName, rarity } = data;

      io.to('plaza').emit('announcement', {
        type: 'rare_hatch',
        message: `🎉 ${username} hatched a ${rarity} ${petName}!`,
        timestamp: new Date(),
      });
    });

    // Disconnect
    socket.on('disconnect', async () => {
      const player = onlinePlayers.get(socket.id);

      if (player) {
        await User.findByIdAndUpdate(player.userId, {
          isOnline: false,
          lastSaved: new Date(),
        });

        onlinePlayers.delete(socket.id);

        io.to('plaza').emit('playerDisconnected', {
          playerId: player.userId,
          username: player.username,
        });

        console.log('👤 Player disconnected:', socket.id);
      }
    });
  });
};

module.exports = { initializeSocketHandlers };
