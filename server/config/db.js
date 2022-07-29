const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB....');
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
