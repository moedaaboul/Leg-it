// >>> hy for debugging
const pageToRender = 'postsByTag';
// <<< hy for debugging

const router = require('express').Router();
const { Post, Tag, User } = require('../../../models');
const withAuth = require('../../../utils/auth');

router.get('/:id', async (req, res) => {
  try {
    //update lego model itself and get the lego model id
    const getPostsByTag = await Tag.findOne({
      where: { id: req.params.id },
      include: [{ model: Post, include: [{ model: User }, { model: Tag }] }],
    });

    const tagName = getPostsByTag.dataValues.title;

    const postArr = getPostsByTag.posts.map((singlePost) => {
      const thisPost = singlePost.dataValues;
      const userName = singlePost.user.dataValues.username;
      const userImage = singlePost.user.dataValues.image;

      const otherTags = singlePost.tags.map((singleTag) => {
        return {
          tagId: singleTag.dataValues.id,
          tagTitle: singleTag.dataValues.title,
        };
      });

      return { thisPost, userName, userImage, otherTags };
    });

    res.render(pageToRender, {
      tagName,
      postArr,
      signedIn: req.session.loggedIn,
      loggedOut: !req.session.loggedIn,
    });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
