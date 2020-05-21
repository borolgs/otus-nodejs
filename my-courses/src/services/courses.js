const Course = require('../models/courses');
const { NotFoundError } = require('../common/errors');

exports.get = async () => {
  const courses = await Course.find();
  return courses;
};

exports.getOne = async id => {
  const course = await Course.findById(id).populate('lessions');
  if (!course) {
    throw new NotFoundError(`Course not found with id of ${id}`);
  }
  return course;
};

exports.create = async data => {
  const course = await Course.create(data);
  return course;
};

exports.update = async (id, data) => {
  const course = await Course.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    throw new NotFoundError(`Course not found with id of ${id}`);
  }
  return course;
};

exports.delete = async id => {
  const course = await Course.findById(id);
  if (!course) {
    throw new NotFoundError(`Course not found with id of ${id}`);
  }
  course.remove();
};
