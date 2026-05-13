// Trading System
class TradingSystem {
  constructor() {
    this.pendingTrades = [];
    this.completedTrades = [];
  }

  async createTradeRequest(receiverId, initiatorPets, initiatorCoins) {
    try {
      const response = await fetch('http://localhost:3000/api/trades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          receiverId,
          initiatorPets,
          initiatorCoins,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        gameState.addTrade(data.trade);
        return data.trade;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Trade creation failed:', error);
      throw error;
    }
  }

  async acceptTrade(tradeId) {
    try {
      const response = await fetch(`http://localhost:3000/api/trades/${tradeId}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        return data.trade;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to accept trade:', error);
      throw error;
    }
  }

  async declineTrade(tradeId) {
    try {
      const response = await fetch(`http://localhost:3000/api/trades/${tradeId}/decline`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        return data.trade;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to decline trade:', error);
      throw error;
    }
  }

  async fetchUserTrades(userId) {
    try {
      const response = await fetch(`http://localhost:3000/api/trades/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        gameState.setTrades(data.trades);
        return data.trades;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to fetch trades:', error);
      return [];
    }
  }
}

const tradingSystem = new TradingSystem();
