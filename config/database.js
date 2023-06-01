const mongoose = require("mongoose");
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });


// here we connect the odm(object document maper) mongoose to the dbms mongodb.

mongoose.connect('mongodb+srv://pkundu307:pkundu307@cluster0.t0qiuuq.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});


// exporting the connection.
module.exports = db;
