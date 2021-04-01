const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const slugify = require('slugify');
const createCourseDir = require('../utils/createCourseDir');
const Author = require('./Author');

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
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Author',
    required: [true, 'Author is required']
  },
  lessons: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Lesson'
  }],
  resources: [String],
  tags: [String],
  cover: String,
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

CourseSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {
    replacement: '_',
    lower: true
  });
  // createCourseDir(this.slug);
  this.constructor.updateAuthor(this.author, this._id);
  next();
})

CourseSchema.pre('deleteOne', { document: true }, function(next) {
  this.constructor.deleteCourseFromAuthor(this.author, this._id);
  next();
})

// Add course id to author.courses array
CourseSchema.statics.updateAuthor = async function(authorId, courseId) {
  try {
    const author = await Author.findById(authorId);
    author.courses = [ ...author.courses, courseId ];
    await author.save();
  } catch (err) {
    console.log(err);
  }
}

// Delete course id from author.courses on course deletion
CourseSchema.statics.deleteCourseFromAuthor = async function(authorId, courseId) {
  try {
    const author = await Author.findById(authorId);
    author.courses = author.courses.filter(c => c.toString() != courseId);
    await author.save();
  } catch (err) {
    console.log(err);
  }
}

module.exports = mongoose.model('Course', CourseSchema);