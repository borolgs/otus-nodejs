const express = require('express');
const router = express.Router();
const apiController = require('../controllers/courses/api');
const viewController = require('../controllers/courses/views');

router.get('/courses', viewController.getCourses);

router
  .route('/courses/create')
  .get((req, res) => {
    res.render('create-course', {});
  })
  .post(viewController.createCourse);

router.get('/courses/:id', viewController.getCourse);
router.get('/courses/:id/edit', viewController.editCourse);
router.post('/courses/:id/edit', viewController.updateCourse);

router
  .route('/api/v1/courses')
  .get(apiController.getCourses)
  .post(apiController.createCourse);

router
  .route('/api/v1/courses/:id')
  .get(apiController.getCourse)
  .patch(apiController.updateCourse)
  .delete(apiController.deleteCourse);

module.exports = router;
