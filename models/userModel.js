const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    phone : string,
    displayName : string,
    experienceYears : number,
    address : string,
    level :{
      type: String,
      enum: ["fresh" , "junior" , "midLevel" , "senior"],
  },
 role :{
    type: String,
    enum: ["user",'admin'],
    default:"user"
},
  password: {
    type: String,
    required: [true, 'password required'],
    minlength: [6, 'Too short password'],
  }});

const User = mongoose.model('User', userSchema);

module.exports = User;







