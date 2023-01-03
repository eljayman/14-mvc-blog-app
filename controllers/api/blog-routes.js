const router = require('express').Router();
const withLogin = require('../../middleware/with-login');
const { Blog, User, Comment } = require('../../models');

//route to get blog from dashboard, then render blog
router.get('/:id', async (req, res) => {
  try {
    //find blog by query param
    const blogData = await Blog.findOne({
      where: { id: req.params.id },
      include: [
        //include comments and user data
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
    });
    const blog = blogData.get({ plain: true });
    // render blog
    // res.json(blog);
    res.render('blog', {
      blog,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
