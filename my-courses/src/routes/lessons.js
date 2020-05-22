const express = require('express');
const {
  getLesson,
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonView,
  createLessonView,
  updateLessonView,
} = require('../controllers/lessons');
const withCourse = require('../middlware/withCourse');

const router = express.Router();

router.get('/courses/:courseId/lessons/:id', withCourse, getLessonView);
router.post('/courses/:courseId/lessons', withCourse, createLessonView);
router.post('/courses/:courseId/lessons/:id/edit', withCourse, updateLessonView);

router
  .route('/api/v1/courses/:courseId/lessons')
  .get(withCourse, getLessons)
  .post(withCourse, createLesson);

router
  .route('/api/v1/courses/:courseId/lessons/:id')
  .get(withCourse, getLesson)
  .patch(withCourse, updateLesson)
  .delete(withCourse, deleteLesson);

module.exports = router;
