const
  jwt = require('jsonwebtoken');
  
module.exports = {
  createJWT: function(email, name, fn){
    var token = jwt.sign({
        name: name,
        email: email
      }, process.env.JWT_SIGN_KEY, {expiresIn: "99999999999h"});
    fn(token)
  }
}
