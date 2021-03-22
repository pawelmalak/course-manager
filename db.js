const mongoose = require('mongoose');

const config = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

const connectDb = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, config);
    console.log(`MongoDB Connected at ${conn.connection.host}:${conn.connection.port} as ${conn.connection.user}`.cyan.underline);
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDb;