const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDb = require('./db');
const errorHandler = require('./middleware/errorHandler');

// Set environmental variables
dotenv.config({ path: './config/config.env' });

connectDb();
const app = express();
const PORT = process.env.PORT || 5001;

// Enable body parser
app.use(express.json());

// Set logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan(':method :url :status :response-time ms'));
}

// Import and register express routes
app.use('/api/v1/courses', require('./routes/courses'));

// Set custom error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow);
})