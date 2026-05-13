const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const { generatePet, getRandomRarity } = require('../utils/pet-generator');

// Get all pets for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.params.userId });
    res.json({ pets: pets.map((p) => p.getDisplayData()) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

// Get single pet
router.get('/:petId', async (req, res) => {
  try {
    const pet = await Pet.findOne({ petId: req.params.petId });

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.json({ pet: pet.getDisplayData() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pet' });
  }
});

// Hatch egg
router.post('/:userId/hatch', authenticateToken, async (req, res) => {
  try {
    if (req.user.userId !== req.params.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { eggType } = req.body;

    // Get user
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check egg costs
    const eggCosts = {
      Starter: 100,
      Forest: 250,
      Ocean: 500,
      Crystal: 1000,
      Void: 2000,
      Celestial: 5000,
    };

    const cost = eggCosts[eggType];
    if (!cost) {
      return res.status(400).json({ error: 'Invalid egg type' });
    }

    if (user.coins < cost) {
      return res.status(400).json({ error: 'Insufficient coins' });
    }

    // Generate pet
    const newPet = await generatePet(user._id, eggType);
    user.coins -= cost;
    await user.save();

    res.status(201).json({
      message: 'Egg hatched successfully',
      pet: newPet.getDisplayData(),
      coins: user.coins,
    });
  } catch (error) {
    console.error('Hatch error:', error);
    res.status(500).json({ error: 'Failed to hatch egg' });
  }
});

// Feed pet
router.post('/:petId/feed', authenticateToken, async (req, res) => {
  try {
    const pet = await Pet.findOne({ petId: req.params.petId });

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    if (pet.owner !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    pet.feed();
    await pet.save();

    res.json({ message: 'Pet fed', pet: pet.getDisplayData() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to feed pet' });
  }
});

// Play with pet
router.post('/:petId/play', authenticateToken, async (req, res) => {
  try {
    const pet = await Pet.findOne({ petId: req.params.petId });

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    if (pet.owner !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    pet.play();
    await pet.save();

    res.json({ message: 'Pet played with', pet: pet.getDisplayData() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to play with pet' });
  }
});

// Rename pet
router.put('/:petId/rename', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.length > 50) {
      return res.status(400).json({ error: 'Invalid pet name' });
    }

    const pet = await Pet.findOne({ petId: req.params.petId });

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    if (pet.owner !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    pet.name = name;
    await pet.save();

    res.json({ message: 'Pet renamed', pet: pet.getDisplayData() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to rename pet' });
  }
});

module.exports = router;
