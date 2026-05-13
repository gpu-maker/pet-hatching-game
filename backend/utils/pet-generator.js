const Pet = require('../models/Pet');
const GAME_CONSTANTS = require('./constants');

const getRandomRarity = () => {
  const rand = Math.random();
  let cumulativeChance = 0;

  for (const rarity of GAME_CONSTANTS.RARITIES) {
    cumulativeChance += rarity.chance;
    if (rand <= cumulativeChance) {
      return rarity.name;
    }
  }

  return 'Common';
};

const getRandomMutation = () => {
  const rand = Math.random();
  // 10% chance for mutation
  if (rand < 0.1) {
    const mutations = GAME_CONSTANTS.MUTATIONS.filter((m) => m !== 'None');
    return mutations[Math.floor(Math.random() * mutations.length)];
  }
  return 'None';
};

const getRandomSpecies = () => {
  return GAME_CONSTANTS.SPECIES[Math.floor(Math.random() * GAME_CONSTANTS.SPECIES.length)];
};

const generatePet = async (userId, eggType) => {
  const rarity = getRandomRarity();
  const mutation = getRandomMutation();
  const species = getRandomSpecies();

  const newPet = new Pet({
    owner: userId,
    species,
    eggType,
    rarity,
    mutation,
    isHatched: true,
    hatchedAt: new Date(),
  });

  await newPet.save();
  return newPet;
};

module.exports = { getRandomRarity, getRandomMutation, getRandomSpecies, generatePet };
