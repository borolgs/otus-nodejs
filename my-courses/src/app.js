const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { mode } = require('./config');
const index = require('./routes/index');
const courses = require('./routes/courses');
const lessons = require('./routes/lessons');
const auth = require('./routes/auth');
const errorHandler = require('./middlware/errorHandler');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

if (mode === 'development') {
  app.use(morgan('dev'));
}

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use('/', index);
app.use('/auth', auth);
app.use(courses);
app.use(lessons);

app.use((req, res, next) => {
  res.status(404);

  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  res.send({ error: 'Not found' });
  return;
});

app.use(errorHandler);

module.exports = app;
