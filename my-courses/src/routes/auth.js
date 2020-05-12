const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.render('auth');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
