const { cloudinary } = require('../../utils/cloudinary');
const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const { urlCompiler } = require('../../utils/helpers');

router.put('/upload', async (req, res) => {
  try {
    let fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr);

    const thisImageURL = urlCompiler(uploadResponse.url, 'w_500,h_500,c_fill');

    const updatedProfile = await User.update(
      {
        image: thisImageURL,
      },
      {
        where: {
          id: req.session.user.id,
        },
      }
    );
    res.json({ updatedProfile, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
// Get one user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      raw: true,
      where: { username: req.body.name },
    });
    if (!user) {
      res.status(404).json({ message: 'Login failed. Please try again!' });
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json({ message: 'Login failed. Please try again!' });
      return;
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = {
        id: user.id,
        username: user.username,
      };
      res.json({ success: true });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new user
router.post('/register', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = {
        id: userData.id,
        username: userData.username,
      };
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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

router.get('/user', (req, res) => {
  if (req.session.loggedIn) {
    res.status(200).json({ user: req.session.user.id });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
