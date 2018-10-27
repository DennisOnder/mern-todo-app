const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../utils/keys').secretOrKey;

// @route  POST /api/login
// @desc   Log in
// @access Public
router.post('/', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user) {
        return res.status(400).json({ errorUser: 'User does not exist.' });
      }
      else {
        bcrypt.compare(req.body.password, user.password)
          .then(match => {
            if(match) {
              const payload = {
                id: user.id,
                email: user.email
              };
              jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
                if(err) {
                  res.json(err);
                } else {
                  res.json({ success: true, token: 'Bearer ' + token });
                }
              })
            } else {
              return res.status(400).json({ password: 'Incorrect Password.' });
            }
          });
        }
    });
});

// @route  GET /api/login
// @desc   Get current user's data
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email
  });
});

module.exports = router;