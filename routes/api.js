const
  express = require('express');

var router = express.Router();

router.route('/init')
  .get(function(req, res){
    return res.send({messag: 'Init'});
  });

module.exports = router
