const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('colors');

const { mode, port } = require('./config');
const facts = require('./routes/facts');
const errorHandler = require('./middlware/error');

const app = express();

app.use(bodyParser.json());

if (mode === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 300,
});
app.use(limiter);
app.use(cors());

app.use(facts);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in ${mode} mode on port ${port}`.yellow.bold);
});
