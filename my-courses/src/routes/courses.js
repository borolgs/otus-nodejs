const express = require('express');
const router = express.Router();
const {
  getCourse,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesView,
  getCourseView,
  createCourseView,
  editCourseView,
  updateCourseView,
} = require('../controllers/courses');

router.get('/courses', getCoursesView);

router
  .route('/courses/create')
  .get((req, res) => {
    res.render('create-course', {});
  })
  .post(createCourseView);

router.get('/courses/:id', getCourseView);
router.get('/courses/:id/edit', editCourseView);
router.post('/courses/:id/edit', updateCourseView);

router
  .route('/api/v1/courses')
  .get(getCourses)
  .post(createCourse);

router
  .route('/api/v1/courses/:id')
  .get(getCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

module.exports = router;
