// >>> hy for debugging
const pageToRender = 'singlePost';
// <<< hy for debugging

const router = require('express').Router();
const { Post, Tag } = require('../../../models');
const withAuth = require('../../../utils/auth');

router.get('/:id', async (req, res) => {
  try {
    //update lego model itself and get the lego model id
    const getPost = await Post.findByPk(req.params.id, {
      include: Tag,
    });

    const tagArr = getPost.tags.map((singleTag) => {
      return { id: singleTag.dataValues.id, title: singleTag.dataValues.title };
    });

    res.status(200).json({ tagArr });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
