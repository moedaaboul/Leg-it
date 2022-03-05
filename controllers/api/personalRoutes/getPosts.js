const router = require('express').Router();
const { User, Post, Tag, Like } = require('../../../models');
const withAuth = require('../../../utils/auth');

router.get('/', async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }
  try {
    //get user info
    const userId = req.session.user.id;
    const userName = req.session.user.username;

    const db_postsByUser = await User.findByPk(userId, {
      attributes: { exclude: ['password', 'email'] },
      include: [
        {
          model: Post,
          required: true,
          include: [
            { model: User },
            {
              model: Like,
            },
            {
              model: Tag,
            },
          ],
        },
      ],
    });
    if (db_postsByUser) {
      const postsByUser = db_postsByUser.get({ plain: true });
      const postArr = postsByUser.posts;
      res.render('managePosts', {
        userName,
        postArr,
        userImage: postsByUser.image,
        signedIn: req.session.loggedIn,
        loggedOut: !req.session.loggedIn,
      });
    } else {
      res.render('noPost', {
        signedIn: req.session.loggedIn,
        loggedOut: !req.session.loggedIn,
      });
    }
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
