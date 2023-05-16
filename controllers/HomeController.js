const BlogPost = require('../models/BlogPost');

exports.getHomePage = (req, res) => {
  BlogPost.findAll()
    .then(posts => {
      res.render('home', { posts });
    })
    .catch(err => {
      console.error('Error retrieving blog posts:', err);
      res.render('home', { posts: [] });
    });
};