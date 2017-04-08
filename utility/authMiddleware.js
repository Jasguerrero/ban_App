const
  jwt = require('jsonwebtoken');

module.exports = function(req, fn){
  var token = req.body.token || req.query.token;
  if(token){
		jwt.verify(token, process.env.JWT_SIGN_KEY, function(err, deco){
      if(err){
        fn(0)
      }else{
        req.deco = deco
        fn(1);
      }
		});
	}
	else{
		fn(0)
	}
}
