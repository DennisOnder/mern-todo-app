const express = require('express');
const router = express.Router();
const passport = require('passport');
const Todo = require('../models/Todo');

// @route  GET /api/todos
// @desc   Get user's todos via user ID
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Todo.find({ user: req.user.id })
    .then(todos => res.json(todos))
    .catch(err => res.send(err));
});

// @route  POST /api/todos
// @desc   Add new todo which is linked via user ID
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newTodo = new Todo({
    user: req.user.id,
    text: req.body.text
  });
  newTodo.save()
    .then(todo => res.json(todo))
    .catch(err => res.send(err));
});

module.exports = router;