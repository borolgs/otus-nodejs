const express = require('express');
const {
  getLession,
  getLessions,
  createLession,
  updateLession,
  deleteLession,
  getLessionView,
  createLessionView,
  updateLessionView,
} = require('../controllers/lessions');
const withCourse = require('../middlware/withCourse');

const router = express.Router();

router.get('/courses/:courseId/lessions/:id', withCourse, getLessionView);
router.post('/courses/:courseId/lessions', withCourse, createLessionView);
router.post('/courses/:courseId/lessions/:id/edit', withCourse, updateLessionView);

router
  .route('/api/v1/courses/:courseId/lessions')
  .get(withCourse, getLessions)
  .post(withCourse, createLession);

router
  .route('/api/v1/courses/:courseId/lessions/:id')
  .get(withCourse, getLession)
  .patch(withCourse, updateLession)
  .delete(withCourse, deleteLession);

module.exports = router;
