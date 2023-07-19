const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const passport = require('passport');

// Route for the homepage
router.get('/', homeController.renderHomePage);

// Route for rendering the login form
router.get('/login', homeController.renderLoginForm);

// Route for handling user login using Passport local strategy
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

// Route for rendering the signup form
router.get('/signup', homeController.renderSignupForm);

// Route for handling user signup
router.post('/signup', homeController.handleSignup);

// Route for handling user logout
router.get('/logout', homeController.handleLogout);

module.exports = router;
