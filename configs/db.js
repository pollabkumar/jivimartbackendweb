// const mongoose = require('mongoose');
// require('dotenv').config()

// const connection = mongoose.connect(process.env.mongoURL);

// module.exports = {
//     connection
// }
const mongoose = require("mongoose");


const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected ${conn.connection.host}`.bgYellow);
  } catch (error) {
    console.log(`Error : ${error.message}`.bgRed);
    process.exit(1);
  }
};

module.exports = {connection};