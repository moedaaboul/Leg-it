const { cloudinary } = require('../../utils/cloudinary');
const router = require('express').Router();
const { Post } = require('../../models');
const { urlCompiler } = require('../../utils/helpers');

router.post('/upload', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr);
    uploadResponse.url = urlCompiler(uploadResponse.url, 'w_1169,h_780,c_fill');

    const newPost = await Post.create({
      post_image: uploadResponse.url,
      user_id: req.session.user.id,
    });
    res.json({ newPost, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user.id,
    });
    res.json({ newPost, success: true });
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(500).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one post by its `id` value
  await Post.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json({ success: true });
});

module.exports = router;
