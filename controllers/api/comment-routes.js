const withLogin = require('../../middleware/with-login');
const { Comment, Blog, User } = require('../../models');
const router = require('express').Router();

router.get('/:id', withLogin, async (req, res) => {
  try {
    //find blog by query param
    const blogData = await Blog.findOne({
      where: { id: req.params.id },
      include: [
        //include comments and user data
        {
          model: User,
          attributes: { exclude: ['password'] },
        },

        {
          model: Comment,
          include: { model: User, attributes: { exclude: ['password'] } },
        },
      ],
    });
    const blog = blogData.get({ plain: true });
    // render comment

    res.render('comment', {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//post new comment route on blog with :id
router.post('/:id', withLogin, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      blog_id: req.params.id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
