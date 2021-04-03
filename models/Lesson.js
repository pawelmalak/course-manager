const mongoose = require('mongoose');
const Course = require('./Course');

const LessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true
  },
  resolution: {
    width: Number,
    height: Number
  },
  filePath: {
    type: String,
    required: true
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Course',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

LessonSchema.pre('save', function(next) {
  this.constructor.updateCourse(this.course, this._id);
  next();
})

// Add lesson id to course.lessons array
LessonSchema.statics.updateCourse = async function(courseId, lessonId) {
  try {
    const course = await Course.findById(courseId);
    course.lessons = [ ...course.lessons, lessonId ];
    await course.save();
  } catch (err) {
    console.log(err);
  }
}

// Delete lesson id from course.lessons on lesson deletion
LessonSchema.statics.deleteLessonFromCourse = async function(courseId, lessonId) {
  try {
    const course = await Course.findById(courseId);
    course.lessons = course.lessons.filter(l => l.toString() != lessonId);
    await course.save();
  } catch (err) {
    console.log(err);
  }
}

module.exports = mongoose.model('Lesson', LessonSchema);