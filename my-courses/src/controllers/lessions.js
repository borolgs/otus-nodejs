const asyncHandler = require('../middlware/asyncHandler');
const service = require('../services/lessions');

// API
exports.getLessions = asyncHandler(async (req, res, next) => {
  const { course } = req;
  const lessions = await service.get(course.id);
  res.status(200).json({ success: true, data: lessions });
});

exports.getLession = asyncHandler(async (req, res, next) => {
  const lession = await service.getOne(req.params.id);
  res.status(200).json({ success: true, data: lession });
});

exports.createLession = asyncHandler(async (req, res, next) => {
  const lession = await service.create(req.body);
  res.status(201).json({
    success: true,
    msg: `Lession created`,
    data: lession,
  });
});

exports.updateLession = asyncHandler(async (req, res, next) => {
  const lession = await service.update(req.params.id, req.body);
  res.status(201).json({
    success: true,
    msg: `Lession updated`,
    data: lession,
  });
});

exports.deleteLession = asyncHandler(async (req, res, next) => {
  await service.delete(req.params.id);
  res.status(200).json({ success: true, msg: 'Lession deleted', data: {} });
});

// VIEWS
exports.getLessionView = asyncHandler(async (req, res, next) => {
  const lession = await service.getOne(req.params.id);
  const { course } = req;
  const comment = lession.toObject().comments[0];
  res.render('lession', { lession: lession.toObject(), course: course.toObject() });
});

exports.createLessionView = asyncHandler(async (req, res, next) => {
  const { course } = req;
  await service.create({ ...req.body, course: course.id });
  res.redirect(`/courses/${course.id}/edit`);
});

exports.updateLessionView = asyncHandler(async (req, res, next) => {
  const { course } = req;
  await service.update(req.params.id, req.body);
  res.redirect(`/courses/${course.id}/edit`);
});
