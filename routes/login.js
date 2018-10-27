const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
              res.json({ loggedIn: true });
            } else {
              return res.status(400).json({ password: 'Incorrect Password.' });
            }
          });
      }
    });
})

module.exports = router;