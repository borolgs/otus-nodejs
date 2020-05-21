const yargs = require('yargs');
const mongoose = require('mongoose');
const { mongoURI } = require('../config');

const courses = require('./data/courses.json');
const lessions = require('./data/lessions.json');

const Course = require('../models/courses');
const Lession = require('../models/lessions');

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
  await Lession.create(lessions);
  console.log('Data Created...');
};

const remove = async () => {
  await Course.deleteMany();
  await Lession.deleteMany();
  console.log('Data Deleted...');
};

const { argv } = yargs
  .command('create', 'Populate database', () => withMongo(create))
  .command('delete', 'Clear database', () => withMongo(remove))
  .alias('h', 'help')
  .help();
