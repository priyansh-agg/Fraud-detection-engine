const mongoose = require("mongoose")
const { mongoUri } = require("../config/env")

module.exports = async function connectDB() {
  try {
    await mongoose.connect(mongoUri)
    console.log("✅ MongoDB connected")
  } catch (err) {
    console.error("❌ MongoDB connection failed")
    process.exit(1)
  }
}