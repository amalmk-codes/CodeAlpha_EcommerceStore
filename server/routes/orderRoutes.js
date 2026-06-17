const express = require("express");

const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  cancelOrder,
  getAnalytics,
} = require("../controllers/orderController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// Create Order
router.post(
  "/",
  protect,
  createOrder
);

// Analytics
router.get(
  "/analytics",
  protect,
  adminOnly,
  getAnalytics
);

// Get All Orders
router.get(
  "/",
  protect,
  adminOnly,
  getAllOrders
);

// Get User Orders
router.get(
  "/user/:userId",
  protect,
  getUserOrders
);

// Update Status
router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateOrderStatus
);

// Cancel Order
router.put(
  "/:id/cancel",
  protect,
  cancelOrder
);

module.exports = router;