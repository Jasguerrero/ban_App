const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    required: true,
    type: String,
    unique: true
  },
  email: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  },
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

userSchema.index({email: 1});
mongoose.model('User', userSchema);
