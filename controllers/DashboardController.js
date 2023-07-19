const { BlogPost } = require('../models');

// Controller actions for handling the user's dashboard

const dashboardController = {
  // Get the user's blog posts
  getUserPosts: async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication

    try {
      const userPosts = await BlogPost.findAll({
        where: { UserId: userId },
        order: [['createdAt', 'DESC']], // Order posts by creation date, newest first
      });
      res.render('dashboard', { userPosts });
    } catch (error) {
      console.error('Error fetching user posts:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Render the new blog post form
  renderNewPostForm: (req, res) => {
    res.render('newpost');
  },
};

module.exports = dashboardController;
