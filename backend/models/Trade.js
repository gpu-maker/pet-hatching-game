const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const TradeSchema = new mongoose.Schema(
  {
    tradeId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    initiator: {
      type: String,
      ref: 'User',
      required: true,
      index: true,
    },
    receiver: {
      type: String,
      ref: 'User',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'cancelled', 'completed'],
      default: 'pending',
      index: true,
    },
    initiatorOffer: {
      pets: [{
        type: String,
        ref: 'Pet',
      }],
      coins: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    receiverOffer: {
      pets: [{
        type: String,
        ref: 'Pet',
      }],
      coins: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    respondedAt: Date,
    completedAt: Date,
    notes: String,
    antiScamChecks: {
      initiatorVerified: { type: Boolean, default: false },
      receiverVerified: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

// Index for trade queries
TradeSchema.index({ initiator: 1, status: 1 });
TradeSchema.index({ receiver: 1, status: 1 });

// Method to accept trade
TradeSchema.methods.accept = function () {
  if (this.status === 'pending') {
    this.status = 'accepted';
    this.respondedAt = new Date();
    return true;
  }
  return false;
};

// Method to decline trade
TradeSchema.methods.decline = function () {
  if (this.status === 'pending') {
    this.status = 'declined';
    this.respondedAt = new Date();
    return true;
  }
  return false;
};

// Method to complete trade
TradeSchema.methods.complete = function () {
  if (this.status === 'accepted') {
    this.status = 'completed';
    this.completedAt = new Date();
    return true;
  }
  return false;
};

module.exports = mongoose.model('Trade', TradeSchema);
