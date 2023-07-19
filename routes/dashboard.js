const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Route for the dashboard page
router.get('/', dashboardController.getUserPosts);

// Route for rendering the new blog post form
router.get('/newpost', dashboardController.renderNewPostForm);

// Route for handling the creation of a new blog post
router.post('/newpost', dashboardController.createPost);

// Route for viewing a specific blog post by ID
router.get('/post/:id', blogPostController.getPostById);

// Route for updating a blog post by ID
router.post('/post/:id/update', blogPostController.updatePost);

// Route for deleting a blog post by ID
router.post('/post/:id/delete', blogPostController.deletePost);

module.exports = router;
