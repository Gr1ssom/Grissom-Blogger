const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Configure Passport.js LocalStrategy
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ where: { username: username } })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Invalid username or password' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return done(err);
          }

          if (!isMatch) {
            return done(null, false, { message: 'Invalid username or password' });
          }

          return done(null, user);
        });
      })
      .catch((err) => done(err));
  })
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

// Set up session middleware
const sessionStore = new SequelizeStore({
  db: sequelize, // Assuming you have a Sequelize instance named 'sequelize'
});

const sessionMiddleware = session({
  secret: 'your_secret_key_here', // Replace with your actual secret key for session management
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
});

module.exports = { passport, sessionMiddleware };
