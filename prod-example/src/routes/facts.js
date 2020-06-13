const { Router } = require('express');

const cache = require('../middlware/cache');
const { getFacts } = require('../controllers/facts');

const router = Router();

router.get('/', cache, getFacts);

module.exports = router;
