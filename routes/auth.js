const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

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
