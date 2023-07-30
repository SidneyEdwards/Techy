const router = require('express').Router();
const { newUser } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // TODO: save the user id, username, and loggedIn status to the req.session
req.session.save(() => {
  req.session.userId = newUser.id;
  req.session.username = newUser.username;
  req.session.logged_in = true;


    res.json(newUser);
  });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    // TODO: save the user id, username, and loggedIn status to the req.session
    req.session.save(() => {
      req.session.userId = newUser.user;
      req.session.username = newUser.username;
      req.session.logged_in = true;
    
    res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
