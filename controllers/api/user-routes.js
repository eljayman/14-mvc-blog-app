const router = require('express').Router();
const { User } = require('../../models/');

//route for new user
router.post('/signup', async (req, res) => {
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
//login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { name: req.body.name },
    });
    //find user by name return error if no user
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect name or password, please try again' });
      return;
    }
    //compare password return error if it doesn't match
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect name or password, please try again' });
      return;
    }
    //record the session data and respond
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
