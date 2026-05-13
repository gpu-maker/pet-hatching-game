const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const PetSchema = new mongoose.Schema(
  {
    petId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    owner: {
      type: String,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      default: 'Unnamed Pet',
      maxlength: 50,
    },
    species: {
      type: String,
      enum: ['Dragon', 'Phoenix', 'Unicorn', 'Fairy', 'Griffin', 'Kraken'],
      required: true,
    },
    eggType: {
      type: String,
      enum: ['Starter', 'Forest', 'Ocean', 'Crystal', 'Void', 'Celestial'],
      required: true,
    },
    rarity: {
      type: String,
      enum: ['Common', 'Uncommon', 'Rare', 'Elite', 'Epic', 'Legendary', 'Mythic', 'Ancient', 'Divine', 'Secret', 'Transcendent', 'Impossible'],
      default: 'Common',
    },
    mutation: {
      type: String,
      enum: ['None', 'Golden', 'Rainbow', 'Shadow', 'Corrupted', 'Galactic'],
      default: 'None',
    },
    level: {
      type: Number,
      default: 1,
      min: 1,
      max: 100,
    },
    experience: {
      type: Number,
      default: 0,
      min: 0,
    },
    hunger: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },
    happiness: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },
    health: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },
    stats: {
      attack: { type: Number, default: 10 },
      defense: { type: Number, default: 10 },
      spAtk: { type: Number, default: 10 },
      spDef: { type: Number, default: 10 },
      speed: { type: Number, default: 10 },
    },
    coinsGenerated: {
      type: Number,
      default: 0,
    },
    isHatched: {
      type: Boolean,
      default: false,
    },
    hatchedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    lastFedAt: Date,
    lastPlayedAt: Date,
    traits: [String],
    inventory: {
      equippedItem: String,
      items: [String],
    },
  },
  { timestamps: true }
);

// Index for faster queries
PetSchema.index({ owner: 1, createdAt: -1 });

// Method to feed pet
PetSchema.methods.feed = function () {
  if (this.hunger < 100) {
    this.hunger = Math.min(100, this.hunger + 20);
  }
  this.lastFedAt = new Date();
  return this;
};

// Method to play with pet
PetSchema.methods.play = function () {
  this.happiness = Math.min(100, this.happiness + 15);
  this.hunger = Math.max(0, this.hunger - 10);
  this.lastPlayedAt = new Date();
  return this;
};

// Method to generate coins
PetSchema.methods.generateCoins = function (multiplier = 1) {
  const baseCoins = Math.floor(Math.random() * 10) + 5;
  const mutationBonus = this.mutation === 'Golden' ? 1.5 : 1;
  const coins = Math.floor(baseCoins * multiplier * mutationBonus);
  this.coinsGenerated += coins;
  return coins;
};

// Method to level up
PetSchema.methods.levelUp = function () {
  if (this.level < 100) {
    this.level += 1;
    this.experience = 0;
    // Increase stats
    this.stats.attack += 1;
    this.stats.defense += 1;
    this.stats.spAtk += 1;
    this.stats.spDef += 1;
    this.stats.speed += 1;
  }
  return this;
};

// Method to get display data
PetSchema.methods.getDisplayData = function () {
  return {
    petId: this.petId,
    name: this.name,
    species: this.species,
    eggType: this.eggType,
    rarity: this.rarity,
    mutation: this.mutation,
    level: this.level,
    hunger: this.hunger,
    happiness: this.happiness,
    health: this.health,
    isHatched: this.isHatched,
  };
};

module.exports = mongoose.model('Pet', PetSchema);
