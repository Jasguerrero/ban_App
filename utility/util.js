const
  jwt = require('jsonwebtoken');

module.exports = {
  createJWT: function(email, name, userID, fn){
    var token = jwt.sign({
        name: name,
        email: email,
        userID: userID
      }, process.env.JWT_SIGN_KEY, {expiresIn: "99999999999h"});
    fn(token)
  }
}
