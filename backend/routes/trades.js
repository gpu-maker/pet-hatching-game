const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');
const User = require('../models/User');
const Pet = require('../models/Pet');
const { authenticateToken } = require('../middleware/auth');

// Create trade request
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { receiverId, initiatorPets, initiatorCoins, receiverPets, receiverCoins } = req.body;

    if (!receiverId) {
      return res.status(400).json({ error: 'Receiver ID required' });
    }

    // Verify initiator has pets
    const initiatorPetObjects = await Pet.find({
      petId: { $in: initiatorPets || [] },
      owner: req.user.userId,
    });

    if (initiatorPetObjects.length !== (initiatorPets?.length || 0)) {
      return res.status(400).json({ error: 'Invalid pet in trade' });
    }

    // Create trade
    const trade = new Trade({
      initiator: req.user.userId,
      receiver: receiverId,
      initiatorOffer: {
        pets: initiatorPets || [],
        coins: initiatorCoins || 0,
      },
      receiverOffer: {
        pets: receiverPets || [],
        coins: receiverCoins || 0,
      },
    });

    await trade.save();

    res.status(201).json({
      message: 'Trade request created',
      trade,
    });
  } catch (error) {
    console.error('Trade creation error:', error);
    res.status(500).json({ error: 'Failed to create trade' });
  }
});

// Get user's trades
router.get('/user/:userId', async (req, res) => {
  try {
    const trades = await Trade.find({
      $or: [{ initiator: req.params.userId }, { receiver: req.params.userId }],
    }).sort({ createdAt: -1 });

    res.json({ trades });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
});

// Accept trade
router.put('/:tradeId/accept', authenticateToken, async (req, res) => {
  try {
    const trade = await Trade.findOne({ tradeId: req.params.tradeId });

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    if (trade.receiver !== req.user.userId) {
      return res.status(403).json({ error: 'Only receiver can accept' });
    }

    if (trade.status !== 'pending') {
      return res.status(400).json({ error: 'Trade is no longer pending' });
    }

    // Verify receiver has pets
    const receiverPetObjects = await Pet.find({
      petId: { $in: trade.receiverOffer.pets },
      owner: req.user.userId,
    });

    if (receiverPetObjects.length !== trade.receiverOffer.pets.length) {
      return res.status(400).json({ error: 'Invalid pet in trade' });
    }

    trade.accept();
    trade.antiScamChecks.receiverVerified = true;
    await trade.save();

    res.json({ message: 'Trade accepted', trade });
  } catch (error) {
    res.status(500).json({ error: 'Failed to accept trade' });
  }
});

// Decline trade
router.put('/:tradeId/decline', authenticateToken, async (req, res) => {
  try {
    const trade = await Trade.findOne({ tradeId: req.params.tradeId });

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    if (trade.receiver !== req.user.userId && trade.initiator !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (trade.status !== 'pending') {
      return res.status(400).json({ error: 'Trade is no longer pending' });
    }

    trade.decline();
    await trade.save();

    res.json({ message: 'Trade declined', trade });
  } catch (error) {
    res.status(500).json({ error: 'Failed to decline trade' });
  }
});

module.exports = router;
