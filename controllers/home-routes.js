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
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, go to dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  //otherwise go to login page
  res.render('login');
});

router.get('/dashboard', async (req, res) => {
  const userData = await User.findOne( {
    where: req.session.name,
    attributes: { exclude: ['password'] },
    include: Blog,
  });

  const user = userData.get({ plain: true });


  res.render('dashboard', {
    ...user,
    logged_in: true,
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
    document.location.replace('/');
    res.end();
  } else {
    alert(response.statusText);
    res.end();
  }
});

module.exports = router;
