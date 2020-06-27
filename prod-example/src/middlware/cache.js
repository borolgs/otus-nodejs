const cache = require('../cache');

module.exports = function(req, res, next) {
  req.cache = cache;

  const key = req.path;
  const data = cache.get(key);

  if (!data) {
    return next();
  }

  res.status(200).json(data);
};
