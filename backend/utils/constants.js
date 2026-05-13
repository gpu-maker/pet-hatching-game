const GAME_CONSTANTS = {
  EGG_TYPES: ['Starter', 'Forest', 'Ocean', 'Crystal', 'Void', 'Celestial'],
  RARITIES: [
    { name: 'Common', chance: 0.1, color: '#808080' },
    { name: 'Uncommon', chance: 0.15, color: '#90EE90' },
    { name: 'Rare', chance: 0.2, color: '#4169E1' },
    { name: 'Elite', chance: 0.15, color: '#9370DB' },
    { name: 'Epic', chance: 0.12, color: '#FFD700' },
    { name: 'Legendary', chance: 0.1, color: '#FF4500' },
    { name: 'Mythic', chance: 0.07, color: '#FF1493' },
    { name: 'Ancient', chance: 0.05, color: '#00CED1' },
    { name: 'Divine', chance: 0.03, color: '#F0F8FF' },
    { name: 'Secret', chance: 0.02, color: '#2F4F4F' },
    { name: 'Transcendent', chance: 0.008, color: '#FFB6C1' },
    { name: 'Impossible', chance: 0.002, color: '#FFFFFF' },
  ],
  MUTATIONS: ['None', 'Golden', 'Rainbow', 'Shadow', 'Corrupted', 'Galactic'],
  SPECIES: ['Dragon', 'Phoenix', 'Unicorn', 'Fairy', 'Griffin', 'Kraken'],
  FOOD_SHOP: [
    { name: 'Apple', cost: 10, hunger: 20 },
    { name: 'Bread', cost: 20, hunger: 30 },
    { name: 'Fish', cost: 30, hunger: 25 },
    { name: 'Cake', cost: 50, hunger: 50 },
    { name: 'Golden Treat', cost: 100, hunger: 60 },
    { name: 'Cosmic Snack', cost: 250, hunger: 75 },
    { name: 'Divine Fruit', cost: 500, hunger: 100 },
  ],
  PLAZA_SIZE: { width: 1200, height: 800 },
};

module.exports = GAME_CONSTANTS;
