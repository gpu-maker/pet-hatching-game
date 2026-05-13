const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    coins: {
      type: Number,
      default: 1000,
      min: 0,
    },
    gems: {
      type: Number,
      default: 0,
      min: 0,
    },
    level: {
      type: Number,
      default: 1,
      min: 1,
    },
    experience: {
      type: Number,
      default: 0,
      min: 0,
    },
    position: {
      x: { type: Number, default: Math.random() * 800 },
      y: { type: Number, default: Math.random() * 600 },
    },
    avatar: {
      type: String,
      default: 'default_avatar',
    },
    bio: {
      type: String,
      maxlength: 200,
      default: '',
    },
    friends: [{
      type: String,
      ref: 'User',
    }],
    friendRequests: [{
      type: String,
      ref: 'User',
    }],
    blocked: [{
      type: String,
      ref: 'User',
    }],
    totalTradesMade: {
      type: Number,
      default: 0,
    },
    totalCoinsTraded: {
      type: Number,
      default: 0,
    },
    lastLogin: Date,
    isOnline: {
      type: Boolean,
      default: false,
    },
    socketId: String,
    accountCreatedAt: {
      type: Date,
      default: Date.now,
    },
    lastSaved: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Method to get public profile
UserSchema.methods.getPublicProfile = function () {
  return {
    id: this._id,
    username: this.username,
    level: this.level,
    avatar: this.avatar,
    bio: this.bio,
    position: this.position,
    isOnline: this.isOnline,
    totalTradesMade: this.totalTradesMade,
  };
};

module.exports = mongoose.model('User', UserSchema);
