const User = require('../models/User')

exports.UserValidator = function(req,res, next){

  //name 
  req.check('email','Invalid email.').isEmail();
  req.check('email','Email is required').notEmpty();
  req.check('username','Username is required').notEmpty()
  req.check('username','Username must be more 1 character').isLength({min : 2})
  req.check('password','Password is required').notEmpty()
  req.check('password','Password confirm is required').notEmpty()
  req.check('password_confirm','Password confirm is required').notEmpty()
  req.check('password_confirm','Password mismatch').equals(req.body.password);
  console.log('xxxxxxxxxxx')
  const errors = req.validationErrors();
  if(errors){
      const firstError = errors.map(error => error.msg)[0];
      return res.status(400).json({error: firstError});
  }
  next();
}