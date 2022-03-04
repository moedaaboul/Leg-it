const router = require('express').Router();
const { User, Post, Comment, Like, Tag, Follower } = require('../models');
router.get('/', async (req, res) => {
  try {
    const dbpostsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'email'],
          },
        },
        {
          model: Like,
        },
        {
          model: Comment,
        },
      ],
      order: [['updatedAt', 'DESC']],
    });
    const postsData = dbpostsData.map((el) => el.get({ plain: true }));
    // console.log(postsData);
    res.render('posts', {
      title: 'Lego Posts',
      postsData: postsData,
      signedIn: req.session.loggedIn,
      loggedOut: !req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
router.get('/posts/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }
  try {
    const dbpostsData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: ['password', 'email'],
          },
          include: [
            {
              model: Follower,
            },
          ],
        },
        {
          model: Like,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              required: true,
              attributes: { exclude: ['password', 'email'] },
            },
          ],
        },
        {
          model: Tag,
        },
      ],
    });
    const postsData = dbpostsData.get({ plain: true });
    postsData.comments.map(
      (e) =>
        (e.signedIn = req.session.loggedIn && e.user_id === req.session.user.id)
    );
    postsData.like =
      postsData.likes.filter((e) => e.user_id === req.session.user.id).length >
      0;
    postsData.follower =
      postsData.user.followers.filter((e) => e.user_id === req.session.user.id)
        .length > 0;
    res.render('singlePost', {
      title: 'Lego Posts',
      postsData: [postsData],
      signedIn: req.session.loggedIn,
      loggedOut: !req.session.loggedIn,
      comments: postsData.comments,
      user: req.session.user.username,
      singlePost: true,
    });
  } catch (error) {
    res.status(404).render('error');
  }
});
router.get('/feed', async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }
  try {
    const dbpostsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'email'],
          },
          include: [
            {
              model: Follower,
            },
          ],
        },
        {
          model: Like,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              required: true,
              attributes: { exclude: ['password', 'email'] },
            },
          ],
        },
        {
          model: Tag,
        },
      ],
      order: [['updatedAt', 'DESC']],
    });
    const dbfollowersData = await Follower.findAll({
      raw: true,
      where: {
        user_id: req.session.user.id,
      },
    });

    const following = dbfollowersData.map((e) => e.follower_id);
    const usersData = await User.findAll({
      raw: true,
      attributes: {
        exclude: ['password', 'email'],
      },
    });
    const suggestedUsers = usersData.filter((e) => !following.includes(e.id));
    console.log(following);
    console.log(usersData);
    console.log(suggestedUsers, 'suggestedUsers');
    // const followersData = dbfollowersData.get({ plain: true });
    // console.log(followersData);
    // console.log(followersData.dataValues, 'followerData');
    let postsData = dbpostsData.map((el) => el.get({ plain: true }));
    postsData.map(
      (e) =>
        (e.like =
          e.likes.filter((e) => e.user_id === req.session.user.id).length > 0)
    );
    postsData.map(
      (e) =>
        (e.follower =
          e.user.followers.filter((e) => e.user_id === req.session.user.id)
            .length > 0)
    );
    postsData = postsData.filter((e) => e.follower === true);
    console.log(postsData);
    // console.log(followersData, 'followersData');
    // console.log(followersData.followers, 'followersData');
    res.render('feed', {
      title: 'Lego Posts',
      postsData: postsData,
      suggestedUsers: suggestedUsers,
      signedIn: req.session.loggedIn,
      loggedOut: !req.session.loggedIn,
      user: req.session.user.username,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
router.get('/favourites', async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }
  try {
    const dbpostsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'email'],
          },
          include: [
            {
              model: Follower,
            },
          ],
        },
        {
          model: Like,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              required: true,
              attributes: { exclude: ['password', 'email'] },
            },
          ],
        },
        {
          model: Tag,
        },
      ],
      order: [['updatedAt', 'DESC']],
    });
    const dbfollowersData = await Follower.findAll({
      raw: true,
      where: {
        user_id: req.session.user.id,
      },
    });

    const following = dbfollowersData.map((e) => e.follower_id);
    const usersData = await User.findAll({
      raw: true,
      attributes: {
        exclude: ['password', 'email'],
      },
    });
    const suggestedUsers = usersData.filter((e) => !following.includes(e.id));
    const postsData = dbpostsData.map((el) => el.get({ plain: true }));
    postsData.map(
      (e) =>
        (e.like =
          e.likes.filter((e) => e.user_id === req.session.user.id).length > 0)
    );
    postsData.map(
      (e) =>
        (e.follower =
          e.user.followers.filter((e) => e.user_id === req.session.user.id)
            .length > 0)
    );
    const filteredData = postsData.filter((e) => e.like === true);
    // console.log(filteredData);
    res.render('feed', {
      title: 'Lego Posts',
      postsData: filteredData,
      signedIn: req.session.loggedIn,
      loggedOut: !req.session.loggedIn,
      user: req.session.user.username,
      suggestedUsers: suggestedUsers,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
router.get('/register', async (req, res) => {
  try {
    res.render('register', {
      register: true,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
router.get('/login', async (req, res) => {
  try {
    res.render('login', {
      login: true,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

router.get('/community/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }
  try {
    const findUser = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password', 'email'] },
      include: [
        {
          model: Post,
          order: [['updatedAt', 'DESC']],
          include: [{ model: Like }],
        },
        {
          model: Follower,
        },
        {
          model: Comment,
        },
      ],
    });

    userData = findUser.get({ plain: true });
    const postArr = userData.posts;
    const postAmount = postArr.length;
    let likeReceived = 0;
    postArr.forEach((singlePost) => {
      likeReceived += singlePost.likes.length;
    });

    const followerArr = userData.followers;
    const followerAmount = followerArr.length;
    const commentAmount = userData.comments.length;

    let follower = false;
    followerArr.forEach((followData) => {
      if (followData.user_id === req.session.user.id) {
        follower = true;
      }
    });

    res.render('userPage', {
      userId: userData.id,
      userImg: userData.image,
      name: userData.username,
      follower,
      postArr,
      likeReceived,
      postAmount,
      followerArr,
      followerAmount,
      commentAmount,
      signedIn: req.session.loggedIn,
      loggedOut: !req.session.loggedIn,
      user: req.session.user.username,
    });
  } catch (error) {
    res.send(error.message);
    res.status(500).json({ msg: error });
  }
});

router.get('/profile', async (req, res) => {
  try {
    res.render('profile');
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

router.get('/*', (req, res) => {
  res.redirect('/');
});

router.get('/noPost', (req, res) => {
  res.render('noPost', {
    signedIn: req.session.loggedIn,
    loggedOut: !req.session.loggedIn,
  });
});

module.exports = router;
