const mongoose = require('mongoose');
const config = require('config');
const db = process.env.MONGO_URI;

const connectDB = async () => {
   try {
      await mongoose.connect(db, {
         useNewUrlParser: true,
         useFindAndModify: false,
         useCreateIndex: true
      });

      console.log('MongoDB Connected..');
   } catch (err) {
      console.log(err.message);
      // Exit process with failure
      process.exit(1);
   }
};

module.exports = connectDB;
