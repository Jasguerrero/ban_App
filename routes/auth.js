const
  express = require('express'),
  mongoose = require('mongoose'),
  bCrypt = require('bcrypt'),
  saltRounds = 10,
  util = require('../utility/util');

var router = express.Router();
var User = mongoose.model('User');

router.post('/register', function(req, res){
  if(!req.body.email || !req.body.password || !req.body.confirm_password || !req.body.name){
    return res.status(422).send({message: 'Missing params'});
  }
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(req.body.email)){
    return res.status(422).send({message: 'Invalid email'});
  }

  if(req.body.password != req.body.confirm_password){
    //421 admin http code to know when the passwords do not match
    return res.status(421).send({message: 'Wrong params'});
  }
  User.findOne({email: req.body.email}, function(err, user){
    if(err){
      return res.status(500).send({message: 'OOPS something went wrong'});
    }
    if(user){
      return res.status(406).send({message: 'User already registered'});
    }

    var newUser = new User();
    newUser.email = req.body.email;
    newUser.password = bCrypt.hashSync(req.body.password, saltRounds);
    newUser.name = req.body.name;

    newUser.save(function(err){
      if(err){
        throw err;
      }
    });
    util.createJWT(req.body.email, req.body.name, function(token){
      return res.send({token: token});
    });
  });
});

module.exports = router