const asyncHandler = require('../middlware/asyncHandler');
const service = require('../services/courses');

// API
exports.getCourses = asyncHandler(async (req, res, next) => {
  const courses = await service.get();
  res.status(200).json({ success: true, data: courses });
});

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await service.getOne(req.params.id);
  res.status(200).json({ success: true, data: course });
});

exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await service.create(req.body);
  res.status(201).json({
    success: true,
    msg: `Course created`,
    data: course,
  });
});

exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await service.update(req.params.id, req.body);
  res.status(201).json({
    success: true,
    msg: `Course updated`,
    data: course,
  });
});

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  await service.delete(req.params.id);
  res.status(200).json({ success: true, msg: 'Course deleted', data: {} });
});

// VIEWS
exports.getCoursesView = asyncHandler(async (req, res, next) => {
  const courses = await service.get();
  res.render('courses', {
    courses: courses.map(c => c.toObject()),
  });
});

exports.getCourseView = asyncHandler(async (req, res, next) => {
  const course = await service.getOne(req.params.id);
  res.render('course', { ...course.toObject() });
});

exports.createCourseView = asyncHandler(async (req, res, next) => {
  const course = await service.create(req.body);
  res.redirect(`/courses/${course.id}/edit`);
});

exports.editCourseView = asyncHandler(async (req, res, next) => {
  const course = await service.getOne(req.params.id);
  res.render('edit-course', { ...course.toObject() });
});

exports.updateCourseView = asyncHandler(async (req, res, next) => {
  const course = await service.update(req.params.id, req.body);
  res.redirect(`/courses/${course.id}/edit`);
});
