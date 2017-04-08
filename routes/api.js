const
  express = require('express'),
  authMiddleware = require('../utility/authMiddleware');

var router = express.Router();

router.use(function(req, res, next){
  authMiddleware(req, function(authenticated){
    return authenticated > 0 ? next() : res.status(401).send({message: 'Unauthorized'});
  });
});


module.exports = router
