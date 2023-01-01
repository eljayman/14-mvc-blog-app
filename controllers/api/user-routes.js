const router = require('express').Router();
const { User } = require('../../models/');

// api route for new user
router.post('/', async (req, res) => {
  try {
    const newUserData = await User.create(req.body);
    res.status(200).json(newUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
