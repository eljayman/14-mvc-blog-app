const router = require('express').Router();
const { Blog, User } = require('../models');

//homepage view all blog entries
router.get('/', async (req, res) => {
  try {
    //get all blogs and user's name
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data into template
    res.render('home', {
      blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
