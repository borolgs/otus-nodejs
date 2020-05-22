const yargs = require('yargs');
const mongoose = require('mongoose');
const { mongoURI } = require('../config');

const courses = require('./data/courses.json');
const lessons = require('./data/lessons.json');

const Course = require('../models/courses');
const Lesson = require('../models/lessons');

const withMongo = async fn => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    await fn();
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

const create = async () => {
  await Course.create(courses);
  await Lesson.create(lessons);
  console.log('Data Created...');
};

const remove = async () => {
  await Course.deleteMany();
  await Lesson.deleteMany();
  console.log('Data Deleted...');
};

const { argv } = yargs
  .command('create', 'Populate database', () => withMongo(create))
  .command('delete', 'Clear database', () => withMongo(remove))
  .alias('h', 'help')
  .help();
