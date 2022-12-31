const router = require('express').Router();
const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: User,
    });
    console.log(blogData);
    // return res.render('home', { ...blogData });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
