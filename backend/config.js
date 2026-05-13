require('dotenv').config();
const mongoose = require('mongoose');

const initializeDatabase = async () => {
  try {
    if (process.env.NODE_ENV === 'production' || process.env.MONGODB_URI) {
      // Use MongoDB
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ Connected to MongoDB');
    } else {
      console.log('⚠️ No database configured. Running in memory mode.');
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

const getConfig = () => ({
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'default_secret',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  maxPlayers: parseInt(process.env.MAX_PLAYERS_PER_SERVER) || 500,
  autoSaveInterval: parseInt(process.env.AUTO_SAVE_INTERVAL) || 30000,
  coinGenerationRate: parseFloat(process.env.COIN_GENERATION_RATE) || 1,
  maxTradeTimeout: parseInt(process.env.MAX_TRADE_TIMEOUT) || 60000,
  tradeTaxPercentage: parseFloat(process.env.TRADE_TAX_PERCENTAGE) || 5,
});

module.exports = { initializeDatabase, getConfig };
