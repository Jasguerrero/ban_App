var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  postID: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150,
    minlength: 2
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

mongoose.model('Comment', commentSchema);
