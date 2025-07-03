const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../Controllers/courses");

const Course = require("../Models/Course");

// mergeParams:true to merge 2 url params
const router = express.Router({ mergeParams: true });

const advancedResults = require("../Middleware/advancedResults");
const { protect, authorize } = require("../Middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, authorize('publisher', 'admin'), addCourse);
router.route("/:id").get(getCourse).put(protect, authorize('publisher', 'admin'), updateCourse).delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
