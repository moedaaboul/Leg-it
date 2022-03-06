const pageToRender = 'posts';

const router = require('express').Router();
const { Tag } = require('../../../models');
const withAuth = require('../../../utils/auth');
const limit = 10 - 1;

router.get('/', async (req, res) => {
  try {
    //update lego model itself and get the lego model id
    const getAll = await Tag.findAll();
    const allTag = getAll.map((x) => x.get({ plain: true }));
    const sortedTag = allTag.filter((e, i) => {
      return i < limit;
    });

    res.status(200).json(sortedTag).render(pageToRender, { sortedTag });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
