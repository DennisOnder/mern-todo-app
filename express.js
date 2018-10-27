const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbKey = require('./utils/keys').mongoURI;
const passport = require('passport');
const register = require('./routes/register');
const login = require('./routes/login');
const port = process.env.PORT || 8000;

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
require('./utils/passport')(passport);

// MongoDB
mongoose.connect(dbKey, { useNewUrlParser: true }, () => console.log('Mongoose Connection Established.'))

// Router
app.use('/api/register', register);
app.use('/api/login', login);

app.listen(port, () => console.log(`Server's running on port ${port}.`));