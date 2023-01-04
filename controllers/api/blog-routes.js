const router = require('express').Router();
const withLogin = require('../../middleware/with-login');

const { Blog, User, Comment } = require('../../models');

//route to get blog from dashboard, then render blog
router.get('/:id', withLogin, async (req, res) => {
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
    res.render('blog', {
      blog,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//new blog post route
router.post('/', withLogin, async (req, res) => {
  const blogData = await Blog.create({
    ...req.body,
    user_id: req.session.user_id,
  });
  res.status(200).json(blogData);
});

//update blog route
router.patch('/:id', withLogin, async (req, res) => {
  const blogData = await Blog.update(
    { contents: req.body.contents },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  res.status(200).json(blogData);
});

//delete blog route
router.delete('/:id', withLogin, async (req, res) => {
  const response = await Blog.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(204).json(response);
});

module.exports = router;
