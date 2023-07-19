const { BlogPost, User } = require('../models');
const passport = require('passport');

// Controller actions for handling the homepage and authentication

const homeController = {
  // Render the homepage with existing blog posts
  renderHomePage: async (req, res) => {
    try {
      const blogPosts = await BlogPost.findAll({
        include: User, // Include the User model to display post creator's username
        order: [['createdAt', 'DESC']], // Order posts by creation date, newest first
      });
      res.render('homepage', { blogPosts });
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Render the login form
  renderLoginForm: (req, res) => {
    res.render('login');
  },

  // Handle user login using Passport local strategy
  handleLogin: passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect to dashboard on successful login
    failureRedirect: '/login', // Redirect back to login page on failed login
  }),

  // Render the signup form
  renderSignupForm: (req, res) => {
    res.render('signup');
  },

  // Handle user signup
  handleSignup: async (req, res) => {
    const { username, password } = req.body;
    try {
      const newUser = await User.create({ username, password });
      // You can implement automatic login after signup if desired.
      res.redirect('/login');
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Handle user logout
  handleLogout: (req, res) => {
    req.logout();
    res.redirect('/');
  },
};

module.exports = homeController;
