const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const db = require('./config/database');

// Import routes
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const blogPostRoutes = require('./routes/blogpost');

const app = express();

// Configure Handlebars as the template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  })
);

// Connect to the database
db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Error connecting to the database:', err));

// Define routes
app.use('/', homeRoutes);
app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/blogpost', blogPostRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
