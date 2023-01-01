const withLogin = require('../../middleware/with-login');
const { Comment } = require('../../models');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
