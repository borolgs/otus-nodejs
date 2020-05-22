const asyncHandler = require('../middlware/asyncHandler');
const service = require('../services/lessons');

// API
exports.getLessons = asyncHandler(async (req, res, next) => {
  const { course } = req;
  const lessons = await service.get(course.id);
  res.status(200).json({ success: true, data: lessons });
});

exports.getLesson = asyncHandler(async (req, res, next) => {
  const lesson = await service.getOne(req.params.id);
  res.status(200).json({ success: true, data: lesson });
});

exports.createLesson = asyncHandler(async (req, res, next) => {
  const lesson = await service.create(req.body);
  res.status(201).json({
    success: true,
    msg: `Lesson created`,
    data: lesson,
  });
});

exports.updateLesson = asyncHandler(async (req, res, next) => {
  const lesson = await service.update(req.params.id, req.body);
  res.status(201).json({
    success: true,
    msg: `Lesson updated`,
    data: lesson,
  });
});

exports.deleteLesson = asyncHandler(async (req, res, next) => {
  await service.delete(req.params.id);
  res.status(200).json({ success: true, msg: 'Lesson deleted', data: {} });
});

// VIEWS
exports.getLessonView = asyncHandler(async (req, res, next) => {
  const lesson = await service.getOne(req.params.id);
  const { course } = req;
  const comment = lesson.toObject().comments[0];
  res.render('lesson', { lesson: lesson.toObject(), course: course.toObject() });
});

exports.createLessonView = asyncHandler(async (req, res, next) => {
  const { course } = req;
  await service.create({ ...req.body, course: course.id });
  res.redirect(`/courses/${course.id}/edit`);
});

exports.updateLessonView = asyncHandler(async (req, res, next) => {
  const { course } = req;
  await service.update(req.params.id, req.body);
  res.redirect(`/courses/${course.id}/edit`);
});
