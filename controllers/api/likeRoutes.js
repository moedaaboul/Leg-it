const router = require('express').Router();
const { Like } = require('../../models');

router.post('/:postId', async (req, res) => {
  try {
    console.log(req.session);
    const { postId } = req.params;
    console.log(postId, 'postId');
    const userId = req.session.user.id;
    console.log(userId, 'userId');
    const result = await Like.findOne({
      where: { user_id: userId, post_id: postId },
    });

    if (!result) {
      await Like.create({ user_id: userId, post_id: postId });
      res
        .status(200)
        .json({ like: true, msg: `successfully liked post id:${postId}` });
    } else {
      await Like.destroy({ where: result.dataValues });
      res
        .status(200)
        .json({ like: false, msg: `successfully unliked post id:${postId}` });
    }
  } catch (error) {
    res.status(500).json({ error: { msg: 'Error in changing like status' } });
  }
});

module.exports = router;
