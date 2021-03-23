const mongoose = require('mongoose');
const hashPassword = require('../utils/hashPassword');

// todo
// array with watched lessons

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Entered email is invalid'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'Password must be at least 6 characters long'],
    select: false
  },
  favorites: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Course'
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.pre('save', async function(next) {
  if (this.password === undefined || this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);