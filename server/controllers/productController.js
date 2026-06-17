const Product = require("../models/Product");
const Review = require("../models/Review");

// Create Product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    const productsWithRatings =
      await Promise.all(
        products.map(async (product) => {
          const reviews =
            await Review.find({
              productId: product._id,
            });

          const reviewCount =
            reviews.length;

          const avgRating =
            reviewCount > 0
              ? (
                  reviews.reduce(
                    (sum, review) =>
                      sum + review.rating,
                    0
                  ) / reviewCount
                ).toFixed(1)
              : 0;

          return {
            ...product.toObject(),
            avgRating,
            reviewCount,
          };
        })
      );

    res.status(200).json({
      success: true,
      count: products.length,
      products: productsWithRatings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Product
const getProductById = async (req, res) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const reviews =
      await Review.find({
        productId: product._id,
      });

    const reviewCount =
      reviews.length;

    const avgRating =
      reviewCount > 0
        ? (
            reviews.reduce(
              (sum, review) =>
                sum + review.rating,
              0
            ) / reviewCount
          ).toFixed(1)
        : 0;

    res.status(200).json({
      success: true,
      product: {
        ...product.toObject(),
        avgRating,
        reviewCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Review.deleteMany({
      productId: req.params.id,
    });

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};