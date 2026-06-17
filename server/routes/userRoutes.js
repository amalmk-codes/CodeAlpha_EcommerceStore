const express = require("express");

const router = express.Router();

const {
  getUsersCount,
  getAllUsers,
} = require("../controllers/userController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Logged-in User Profile
router.get(
  "/profile",
  protect,
  (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);

// Total Users Count
router.get(
  "/count",
  getUsersCount
);

// Get All Users
router.get(
  "/all",
  getAllUsers
);

module.exports = router;