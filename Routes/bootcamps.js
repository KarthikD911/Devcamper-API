const express = require("express");
const {
  getBootcampsInRadius,
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload,
} = require("../Controllers/bootcamps");

const Bootcamp = require("../Models/Bootcamp");

// Include other resource routers
const courseRouter = require("./courses");
const reviewRouter = require('./reviews');

const router = express.Router();

const advancedResults = require("../Middleware/advancedResults");
const { protect, authorize } = require("../Middleware/auth");

//Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

// Generate routes and use .routes to establish connection between router and controller (MVC architecture)
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

// Upload photo
router.route("/:id/photo").put(protect,authorize('publisher', 'admin'), bootcampPhotoUpload);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;
