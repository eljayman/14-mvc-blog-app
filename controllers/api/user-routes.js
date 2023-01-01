const router = require('express').Router();
const { User } = require('../../models/');

// api route for new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    //log user in after it is created
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
