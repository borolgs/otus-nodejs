const express = require('express');

const apiController = require('../controllers/lessons/api');
const viewController = require('../controllers/lessons/views');
const withCourse = require('../middlware/withCourse');

const router = express.Router();

router.get('/courses/:courseId/lessons/:id', withCourse, viewController.getLesson);
router.post('/courses/:courseId/lessons', withCourse, viewController.createLesson);
router.post('/courses/:courseId/lessons/:id/edit', withCourse, viewController.updateLesson);

router
  .route('/api/v1/courses/:courseId/lessons')
  .get(withCourse, apiController.getLessons)
  .post(withCourse, apiController.createLesson);

router
  .route('/api/v1/courses/:courseId/lessons/:id')
  .get(withCourse, apiController.getLesson)
  .patch(withCourse, apiController.updateLesson)
  .delete(withCourse, apiController.deleteLesson);

module.exports = router;
