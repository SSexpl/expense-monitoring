const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */ 

const conn = "mongodb://localhost:27017/tutorial_d";

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    phash:String,
    psalt:String,
    email:String,
    pet:String,
    nationality:String,
    city:String,
    bank:String,
    DOBhash:String,
    DOBsalt:String
});


const User = connection.model('User', UserSchema);

// Expose the connection
module.exports = connection;
