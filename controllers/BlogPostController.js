const { BlogPost, User } = require('../models');

// Controller actions for handling blog posts

const blogPostController = {
  // Get all blog posts
  getAllPosts: async (req, res) => {
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

  // Get a specific blog post by ID
  getPostById: async (req, res) => {
    const postId = req.params.id;
    try {
      const blogPost = await BlogPost.findByPk(postId, { include: User });
      if (!blogPost) {
        return res.status(404).send('Blog post not found');
      }
      res.render('blogpost', { blogPost });
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Create a new blog post
  createPost: async (req, res) => {
    const { title, contents } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication

    try {
      const blogPost = await BlogPost.create({
        title,
        contents,
        UserId: userId, // Assign the post to the authenticated user
      });
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Update a blog post by ID
  updatePost: async (req, res) => {
    const postId = req.params.id;
    const { title, contents } = req.body;

    try {
      const blogPost = await BlogPost.findByPk(postId);
      if (!blogPost) {
        return res.status(404).send('Blog post not found');
      }

      blogPost.title = title;
      blogPost.contents = contents;
      await blogPost.save();

      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error updating blog post:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Delete a blog post by ID
  deletePost: async (req, res) => {
    const postId = req.params.id;

    try {
      const blogPost = await BlogPost.findByPk(postId);
      if (!blogPost) {
        return res.status(404).send('Blog post not found');
      }

      await blogPost.destroy();
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = blogPostController;
