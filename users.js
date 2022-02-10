const mongoose = require('mongoose');

var emailValidation = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const mongossdb = new mongoose.Schema({

  firstName: {
    type: String,
    required: [true, "First name must be entered"],
    trim: true,
},
lastName: {
    type: String,
    required: [true, "Last name must be entered"],
    trim: true,
},

  emailid: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Required',
    validate: [emailValidation, 'Please give your email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please give your email address']
  },
  password: {
    type: String,
    required: [true, "Password must be entered"],
    trim: true,
},
creation_date: {
    type: Date,
    required: [true],
    trim: true,
}

});

const Users = mongoose.model("Users", mongossdb);
module.exports = Users;