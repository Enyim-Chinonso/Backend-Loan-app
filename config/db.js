const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/loan_app');

    console.log(`✅ MongoDB Connected`);
  } catch (error) {
    console.error("Database Connection Error");

    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;