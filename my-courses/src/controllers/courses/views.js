const asyncHandler = require('../../middlware/asyncHandler');
const service = require('../../services/courses');

exports.getCourses = asyncHandler(async (req, res, next) => {
  const courses = await service.get();
  res.render('courses', {
    courses: courses.map(c => c.toObject()),
  });
});

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await service.getOne(req.params.id);
  res.render('course', { ...course.toObject() });
});

exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await service.create(req.body);
  res.redirect(`/courses/${course.id}/edit`);
});

exports.editCourse = asyncHandler(async (req, res, next) => {
  const course = await service.getOne(req.params.id);
  res.render('edit-course', { ...course.toObject() });
});

exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await service.update(req.params.id, req.body);
  res.redirect(`/courses/${course.id}/edit`);
});
