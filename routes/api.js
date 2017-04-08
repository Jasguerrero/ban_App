const
  express = require('express'),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post'),
  authMiddleware = require('../utility/authMiddleware');

var router = express.Router();

router.use(function(req, res, next){
  authMiddleware(req, function(authenticated){
    return authenticated > 0 ? next() : res.status(401).send({message: 'Unauthorized'});
  });
});

router.route('/posts')
  .get(function(req, res){
    Post.find({}, {created_at: 1, text: 1, likes_count: 1, likesArr: 1, comments_count: 1, username: 1}).sort({created_at: -1}).exec(function(err, data){
      if(err)
        return res.status(500).send({message: 'OOPS something went wrong'});

      for(let d of data){
        if(d.likesArr.indexOf(req.deco.userID) != -1){
          d.liked = true;
				}
        d.likesArr = undefined;
      }
      return res.send(data);
    });
  })
  .post(function(req, res){
    if(!req.body.text){
      return res.status(422).send({message: 'Missing params'})
    }
    newPost = new Post();
    newPost.text = req.body.text;
    newPost.userID = req.deco.userID;
    newPost.username = req.deco.name;

    newPost.save(function(err, new_post){
      if(err){
        return res.status(422).send({message: 'Validation failed'});
      }
      return res.status(201).send({message: 'Post created'});
    });
  });


module.exports = router
