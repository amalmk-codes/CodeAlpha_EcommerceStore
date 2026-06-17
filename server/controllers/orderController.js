const Order = require("../models/Order");
const Product = require("../models/Product");

// Create Order
const createOrder = async (req, res) => {
  try {
   const {
  userId,
  userName,
  items,
  totalAmount,
   } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID Required",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart Is Empty",
      });
    }

    for (const item of items) {
      const product =
        await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product Not Found",
        });
      }

      if (
        product.stock < item.quantity
      ) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`,
        });
      }

      product.stock =
        product.stock - item.quantity;

      await product.save();
    }

    const order = await Order.create({
  userId,
  userName,
  items,
  totalAmount,
  status: "Pending",
});

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Orders
const getAllOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Orders
const getUserOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find({
        userId: req.params.userId,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Order Status
const updateOrderStatus =
  async (req, res) => {
    try {
      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          {
            new: true,
          }
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order Not Found",
        });
      }

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Cancel Order
const cancelOrder = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status: "Cancelled",
        },
        {
          new: true,
        }
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order Not Found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Analytics
const getAnalytics = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find();

    const totalOrders =
      orders.length;

    const totalRevenue =
      orders.reduce(
        (sum, order) =>
          sum + order.totalAmount,
        0
      );

    const pendingOrders =
      orders.filter(
        (order) =>
          order.status ===
          "Pending"
      ).length;

    const deliveredOrders =
      orders.filter(
        (order) =>
          order.status ===
          "Delivered"
      ).length;

    const cancelledOrders =
      orders.filter(
        (order) =>
          order.status ===
          "Cancelled"
      ).length;

    res.status(200).json({
      success: true,
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  cancelOrder,
  getAnalytics,
};