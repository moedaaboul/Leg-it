//need to set up auth in utils via login
const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user.id,
    });
    res.json({ newComment, success: true });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedComment = await Comment.update(
      {
        comment_text: req.body.comment_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (updatedComment) {
      res.json({ success: true, updatedComment });
    } else {
      res.json({
        message: `No comment with ID of ${req.params.id} could be found`,
      });
    }
  } catch (err) {
    console.log(err, 'could not find id');
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedComment) {
      res.json({ success: true });
    } else {
      res.json({
        message: `No comment with ID of ${req.params.id} could be found`,
      });
    }
  } catch (err) {
    console.log(err, 'could not find id');
    res.status(500).json(err);
  }
});
module.exports = router;
