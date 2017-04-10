const
  express = require('express'),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post'),
  Comment = mongoose.model('Comment'),
  authMiddleware = require('../utility/authMiddleware'),
  multer = require('multer'),
  path = require('path');

var router = express.Router();

router.use(function(req, res, next){
  authMiddleware(req, function(authenticated){
    return authenticated > 0 ? next() : res.status(401).send({message: 'Unauthorized'});
  });
});

var storage = multer.diskStorage({
	destination: function(req, file, callback){
		callback(null, './uploads');
	},
	filename: function(req, file, callback){
		var extension = path.extname(file.originalname);
		var fileName = path.basename(file.originalname, extension)
			+'_'+ Date.now() + extension;

		callback(null, fileName);
	}
});

var upload = multer({storage : storage, fileFilter: function(req,file,cb){
	cb(null, (path.extname(file.originalname) == '.png' ||
  path.extname(file.originalname) == '.jpg' ||
  path.extname(file.originalname) == '.jpeg'));
}}).single('file');

router.route('/posts')
  .get(function(req, res){
    Post.find({}, {created_at: 1, text: 1, image: 1, likes_count: 1, likesArr: 1, comments_count: 1, username: 1}).sort({created_at: -1}).exec(function(err, data){
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
    upload(req, res, function(err){
      if(!req.body.text || (req.file == undefined)){
        return res.status(422).send({message: 'Missing params'})
      }
      newPost = new Post();
      newPost.text = req.body.text;
      newPost.image = req.file.filename;
      newPost.userID = req.deco.userID;
      newPost.username = req.deco.name;

      newPost.save(function(err, new_post){
        if(err){
          return res.status(422).send({message: 'Validation failed'});
        }
        return res.status(201).send({message: 'Post created'});
      });
    });
  });

router.route('/post/:id/like')
	.post(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err){
				return res.status(422).send({message: "Invalid ID"});
			}
			if(!post){
				return res.status(404).send({message: "Post not found"});
			}

			var indexarr = post.likesArr.indexOf(req.deco.userID);
			if(indexarr == -1){
				post.likes_count += 1;
				post.likesArr.push(req.deco.userID);
				post.save();
				return res.send({message: "Post liked"});
			}
			else{
				post.likesArr.splice(indexarr, 1);
				post.likes_count -= 1;
				post.save();
				return res.status(201).send({message: "Post disliked"});
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
      post.comments_count += 1;
      post.save(function(err, new_post){
        if(err)
          return res.status(500).send({message: 'OOPS something went wrong'});
        return res.status(201).send({message: 'Comment created'});
      });
    });
  });
});

router.get('/post/:id/comments', function(req, res){
  Comment.find({postID: req.params.id}, {created_at: 1, text: 1, username: 1}).sort({created_at: 1}).exec(function(err, comments){
    if(err)
      return res.status(500).send({message: 'OOPS something went wrong'});
    return res.send(comments);
  });
});


module.exports = router
