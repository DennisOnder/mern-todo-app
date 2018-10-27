const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        res.status(400).json({ user: 'User already exists.' });
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
});

module.exports = router;