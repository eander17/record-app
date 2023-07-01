/**
 *
 * @format
 */

import { connect } from 'mongoose'

const connectDB = async () => {
  try {
    // eslint-disable-next-line no-unused-vars
    const conn = await connect(process.env.MONGO_URI)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB
