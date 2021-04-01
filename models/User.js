const mongoose = require('mongoose');
const hashPassword = require('../utils/hashPassword');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: ''
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
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  favorites: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Course'
  }],
  watched: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Lesson'
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
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);