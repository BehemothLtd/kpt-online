const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const userSchema = new Schema({
  email: {type: String, unique: true, required: true},
  username: {type:String, required: true, minlength:2},
  password: {type:String, required: true , minlength: 6},
  password_confirm : {type:String, required: true, minlength:6}

})

module.exports = mongoose.model('User', userSchema)