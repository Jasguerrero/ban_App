const
  express = require('express'),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post'),
  Comment = mongoose.model('Comment'),
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

router.route('/post/:id/like')
	.get(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err){
				return res.status(422).send({message: "Invalid ID"});
			}
			if(!post){
				return res.status(404).send({message: "Post not found"});
			}

			var indexarr = post.likesArr.indexOf(req.deco.userID);
			if(indexarr == -1){
				post.likes += 1;
				post.likesArr.push(req.deco.userID);
				post.save();
				return res.json({message: "Post liked"});
			}
			else{
				post.likesArr.splice(indexarr, 1);
				post.likes -= 1;
				post.save();
				return res.status(201).send({message: "Comment disliked"});
			}
		});
	});

router.post('/comment/:post_id', function(req, res){
  if(!req.body.text)
    return res.status(422).send({message: 'Missing params'});

  Post.findById(req.params.post_id, function(err, post){
    if(err)
      return res.status(500).send({message: 'OOPS something went wrong'});

    if(!post)
      return res.status(404).send({message: 'Post not found'});

    newComment = new Comment();
    newComment.postID = post._id;
    newComment.text = req.body.text;
    newComment.userID = req.deco.userID;
    newComment.username = req.deco.name;

    newComment.save(function(err, new_comment){
      if(err)
        return res.status(500).send({message: 'OOPS something went wrong'});
      return res.status(201).send({message: 'Comment created'});
    });
  });
});


module.exports = router
