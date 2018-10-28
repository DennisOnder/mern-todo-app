const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Validator = require('validator');

// @route  POST /api/register
// @desc   Register a new user
// @access Public
router.post('/', (req, res) => {
  let errors = {};
  if(Validator.isEmpty(req.body.email)) {
    errors.empty = 'Email Field is required.';
  }
  if(!Validator.isEmail(req.body.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if(Validator.isEmpty(req.body.password)) {
    errors.password = 'Password Field is required.';
  }
  if(req.body.password !== req.body.password2) {
    errors.passwordConfirmation = 'Passwords do not match.';
  }
  if(errors.email || errors.empty || errors.password || errors.passwordConfirmation) {
    return res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({ userExists: 'User already exists.' });
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          if(err) {
            res.json(err);
          } else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) {
                res.json(err);
              } else {
                newUser.password = hash;
                newUser.save()
                  .then(user => res.json(user))
                  .catch(err => res.send(err));
              }
            })
          }
        })
      }
    })
  }
});

module.exports = router;