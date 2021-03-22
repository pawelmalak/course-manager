const mongoose = require('mongoose');

// TODO
// add author ref

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
    unique: true
  },
  url: {
    type: String,
    trim: true,
    match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Invalid URL format']
  },
  lessons: [String],
  resources: [String],
  tags: [String],
  cover: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Course', CourseSchema);