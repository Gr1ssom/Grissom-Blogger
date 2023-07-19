const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

// Import the required controllers
const homeController = require('./controllers/homeController');
const dashboardController = require('./controllers/dashboardController');
const blogPostController = require('./controllers/blogPostController');

// Import the database connection
const sequelize = require('./config/database');

// Create the Express application
const app = express();

// Set up the port for the server
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware for session management
app.use(
  session({
    secret: 'your_secret_key_here', // Replace with your actual secret key for session management
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', homeController.renderHomePage);
app.get('/login', homeController.renderLoginForm);
app.post('/login', homeController.handleLogin);
app.get('/signup', homeController.renderSignupForm);
app.post('/signup', homeController.handleSignup);
app.get('/logout', homeController.handleLogout);
app.get('/dashboard', dashboardController.getUserPosts);
app.get('/dashboard/newpost', dashboardController.renderNewPostForm);
app.post('/dashboard/newpost', blogPostController.createPost);
app.get('/dashboard/post/:id', blogPostController.getPostById);
app.post('/dashboard/post/:id/update', blogPostController.updatePost);
app.post('/dashboard/post/:id/delete', blogPostController.deletePost);

// Set up static folder for serving CSS and other static files
app.use(express.static(path.join(__dirname, 'public')));

// Sync the database models and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
});
