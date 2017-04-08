var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  text:{
    type: String,
    required: true,
    trim: true,
    maxlength: 150,
    minlength: 2
  },
  userID: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  username: {
    type: String,
    required: true
  },
  likes_count: {
    type: Number,
    default: 0
  },
  likesArr: [],
  liked: {
    type: Boolean,
    default: false
  },
  comments_count: {
    type: Number,
    default: 0
  },
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

postSchema.index({likes: 1});
postSchema.index({created_at: 1});

mongoose.model('Post', postSchema);
