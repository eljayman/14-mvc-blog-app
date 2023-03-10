const router = require('express').Router();
const { Blog, User } = require('../models');
const withLogin = require('../middleware/with-login');

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
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//login screen with sign up form
router.get('/login', (req, res) => {
  // If the user is already logged in, go to dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  //otherwise go to login page
  res.render('login', {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
  });
});

//user dashboard requires user is logged in
router.get('/dashboard', withLogin, async (req, res) => {
  const userData = await User.findOne({
    where: { id: req.session.user_id },
    attributes: { exclude: ['password'] },
    include: Blog,
  });
  //dashboard view includes all of user's blogs
  const user = userData.get({ plain: true });
  res.render('dashboard', {
    ...user,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
  });
});

//link from homepage sends fetch request to api/user/logout
router.get('/logout', withLogin, async (req, res) => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  //handle the response
  if (response.ok) {
    location.replace('/login');
    res.end();
  } else {
    res.end();
  }
});

//route to create-blog page
router.get('/create', withLogin, (req, res) => {
  res.render('create-blog', {
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
