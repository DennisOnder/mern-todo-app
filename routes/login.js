const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../utils/keys').secretOrKey;
const Validator = require('validator');

// @route  POST /api/login
// @desc   Log in
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
    errors.password = 'Password is required.';
  }
  if(errors.email || errors.empty || errors.password) {
    return res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.email })
    .then(user => {
      if(!user) {
        return res.status(400).json({ userDoesNotExist: 'User does not exist.' });
      }
      else {
        bcrypt.compare(req.body.password, user.password)
          .then(match => {
            if(match) {
              const payload = {
                id: user.id,
                email: user.email
              };
              jwt.sign(payload, key, { expiresIn: 172800 }, (err, token) => {
                res.json({ success: true, token: 'Bearer ' + token });
              })
            } else {
              return res.status(400).json({ incorrectPassword: 'Incorrect Password.' });
            }
          });
        }
    });
  }
});

// @route  GET /api/login/current
// @desc   Get current user's data
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email
  });
});

module.exports = router;