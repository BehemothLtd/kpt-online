var jwt = require('jsonwebtoken');

exports.userInfo = (req) =>{
  const token = req.headers.authorization.replace('Bearer ','');
  return jwt.decode(token).userInfo;
}