const path = require('path');
const multerModule = require('multer');
const slugify = require('slugify');
const createCourseDir = require('../utils/createCourseDir');

const fields = [
  { name: 'cover', maxCount: 1 },
  { name: 'videos', maxCount: 4096 },
  { name: 'recources', maxCount: 512 }
];

const storage = multerModule.diskStorage({
  destination: (req, file, cb) => {
    const courseSlug = generateSlug(req.body.name);
    createCourseDir(courseSlug);
    cb(null, `./public/uploads/${courseSlug}`)
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`)
  }
});

const multer = multerModule({ storage }).fields(fields);

module.exports = multer;

// Utility functions
const generateSlug = (courseName) => slugify(courseName, { replacement: '_', lower: true });