const router = require('express').Router();
const withLogin = require('../../middleware/with-login');
const { Blog } = require('../../models');

router.post('/', withLogin, async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(200).json(newBlog);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
