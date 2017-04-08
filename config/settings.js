const
  config = require('config');


module.exports = {
  getdbPath: function(){
    if(!(config.get('mongo_host') && config.get('mongo_port') && config.get('mongo_db_name'))){
      console.error("Missing mongo config values");
      process.exit(1)
    }
    return 'mongodb://'+config.get('mongo_host')+':'+config.get('mongo_port')+'/'+config.get('mongo_db_name')
  },
  jwtInit: function(){
    if(!config.get('jwtSignKey')){
      console.log('JWT sign value missing');
      process.exit(1)
    }
    process.env.JWT_SIGN_KEY = config.get('jwtSignKey');
  }
}
