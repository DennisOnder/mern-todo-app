const express = require('express');
const router = express.Router();
const passport = require('passport');
const Todo = require('../models/Todo');
const Validator = require('validator');

// @route  GET /api/todos
// @desc   Get user's todos via user ID
// @access Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Todo.find({ user: req.params.id }).sort({date: -1})
    .then(todos => res.json(todos))
    .catch(err => res.send(err));
});

// @route  POST /api/todos
// @desc   Add new todo which is linked via user ID
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  let errors = {};
  if(Validator.isEmpty(req.body.text)) {
    errors.empty = 'Text Field is empty.';
  }
  if(errors.empty) {
    return res.status(400).json(errors);
  } else {
    const newTodo = new Todo({
      user: req.body.id,
      text: req.body.text
    });
    newTodo.save()
      .then(todo => res.json(todo))
      .catch(err => res.send(err));
  };
})

// @route  DELETE /api/todos
// @desc   Delete user's todos via user ID
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, res) => {
    if(err) {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;