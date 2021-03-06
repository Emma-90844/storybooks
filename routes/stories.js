const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('stories/index');
});

router.get('/add', (req, res) => {
    res.render('stories/add');
  });

  router.get('/edit', (req, res) => {
    res.render('stories/edit');
  });

module.exports = router;
