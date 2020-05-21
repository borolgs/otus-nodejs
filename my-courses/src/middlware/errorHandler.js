const { NotFoundError } = require('../common/errors');

const errorHandler = (err, req, res, next) => {
  const sendError = errorSender(req, res);

  if (err instanceof NotFoundError) {
    sendError(404, err);
    return;
  }

  if (err.name === 'MongoError') {
    sendError(400, err);
    return;
  }

  console.log(err);
  sendError(500, err);
};

const errorSender = (req, res) => (status, error) => {
  res.status(status);
  if (req.headers['content-type'] === 'application/json') {
    res.send({ error: error.message });
  } else {
    console.log('status', status);
    res.render('error', { status, error: error.message });
  }
};

module.exports = errorHandler;
