const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  shopName: {
    type: String,
    required: true
  },
  shopAddress: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ['shopkeeper'],
    default: 'shopkeeper'
  },
  monthlySales: [{
    month: String,
    year: Number,
    amount: Number
  }],
  kathaCollected: [{
    date: Date,
    amount: Number,
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    }
  }],
  loans: [{
    amount: Number,
    date: Date,
    description: String,
    status: {
      type: String,
      enum: ['active', 'paid'],
      default: 'active'
    }
  }],
  monthlyBillings: [{
    month: String,
    year: Number,
    items: [{
      name: String,
      quantity: Number,
      amount: Number
    }],
    totalAmount: Number
  }],
  settings: {
    currency: {
      type: String,
      default: 'INR'
    },
    theme: {
      type: String,
      default: 'light'
    },
    notifications: {
      type: Boolean,
      default: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema); 