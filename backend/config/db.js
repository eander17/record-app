// eslint-disable-next-line
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // eslint-disable-next-line no-unused-vars
    const conn = await mongoose.connect(process.env.MONGO_URI)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
