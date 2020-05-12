const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const courses = require('./routes/courses');
const lessions = require('./routes/lessions');
const auth = require('./routes/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use('/', index);
app.use('/auth', auth);
app.use('/courses', courses);
app.use('/lessions', lessions);

app.use((req, res, next) => {
  res.status(404);

  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  res.send({ error: 'Not found' });
  return;
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('uncaughtException', err => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
