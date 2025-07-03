const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../Controllers/users");

const User = require("../Models/User");

// mergeParams:true to merge 2 url params
const router = express.Router({ mergeParams: true });

const advancedResults = require("../Middleware/advancedResults");
const { protect, authorize } = require("../Middleware/auth");

router.use(protect);
router.use(authorize("admin"));
router.route("/").get(advancedResults(User), getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
