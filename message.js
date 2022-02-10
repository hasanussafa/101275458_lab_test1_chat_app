const mongoose = require('mongoose');

const mongossdb = new mongoose.Schema({

  from_user: {
    type: String,
    required: [true],
    trim: true,
},
toUser: {
    type: String,
    required: [true],
    trim: true,
},
room: {
    type: String,
    required: [true],
    trim: true,
},
 
  message: {
    type: String,
    required: [true],
    trim: true,
},
date_sent: {
    type: Date,
    required: [true],
    trim: true,
}

});

const Users = mongoose.model("Users", mongossdb);
module.exports = Users;