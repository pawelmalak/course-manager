const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDb = require('./db');
const multer = require('./middleware/multer');
const errorHandler = require('./middleware/errorHandler');

// Set environmental variables
dotenv.config({ path: './config/config.env' });

connectDb();
const app = express();
const PORT = process.env.PORT || 5001;

// Enable body parser
app.use(express.json());

app.use(cors());
app.use(multer);

// Static dir
app.use(express.static('./public'));

// Set logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan(':method :url :status :response-time ms'));
}

// Import and register express routes
app.use('/api/v1/courses', require('./routes/courses'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/authors', require('./routes/authors'));
app.use('/api/v1/lessons', require('./routes/lessons'));
app.use('/api/v1/auth', require('./routes/auth'));

// Set custom error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow);
})