const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ChatSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    sender: {
      type: String,
      ref: 'User',
      required: true,
      index: true,
    },
    senderUsername: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 500,
    },
    channel: {
      type: String,
      enum: ['global', 'local', 'trade'],
      default: 'global',
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    isProfanityFiltered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for chat queries
ChatSchema.index({ timestamp: -1 });
ChatSchema.index({ channel: 1, timestamp: -1 });

module.exports = mongoose.model('Chat', ChatSchema);
