const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ where: { username: username } })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }
      if (!user.verifyPassword(password)) {
        return done(null, false, { message: 'Invalid username or password' });
      }
      return done(null, user);
    })
    .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err));
});
