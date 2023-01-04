const withLogin = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};
//middleware to protect views from being rendered by a user who isn't logged in
module.exports = withLogin;
