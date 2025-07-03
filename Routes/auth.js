const express = require("express");
const {
  updatePassword,
  updateDetails,
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  logout,
} = require("../Controllers/auth");

const router = express.Router();

const { protect } = require("../Middleware/auth");

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
