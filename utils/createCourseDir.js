const fs = require('fs');
const path = require('path');

const createCourseDir = (courseSlug) => {
  const mainDir = path.join(__dirname, '../public/uploads');

  // Create main directory
  fs.mkdirSync(path.join(mainDir, courseSlug));

  // Create subdirectories
  fs.mkdirSync(path.join(mainDir, courseSlug, '/videos'));
  fs.mkdirSync(path.join(mainDir, courseSlug, '/resources'));
}

module.exports = createCourseDir;