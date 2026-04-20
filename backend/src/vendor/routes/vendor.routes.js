const express = require('express');
const router = express.Router();
const VendorController = require('../controllers/vendor.controller');
const VendorOrderController = require('../controllers/vendor.order.controllers');
const VendorProductController = require('../controllers/vendor.product.controllers');
const VendorReviewController = require('../controllers/vendor.review.controllers');
const VendorAnalyticsController = require('../controllers/vendor.analytics.controllers');
const { verifyToken } = require('../../authorization/middleware/auth');

// All routes below require authentication
router.use(verifyToken);

// ==================== VENDOR PROFILE ROUTES ====================
router.get('/me', VendorController.getVendorDetails);
router.put('/update', VendorController.updateVendorDetails);
router.get('/stats/dashboard', VendorController.getVendorDashboardStats);

// ==================== VENDOR ORDER ROUTES ====================
router.get('/orders', VendorOrderController.getVendorOrders);
router.get('/orders/stats', VendorOrderController.getVendorOrderStats);
router.get('/orders/status/:status', VendorOrderController.getVendorOrdersByStatus);
router.get('/orders/:id', VendorOrderController.getVendorOrderById);
router.put('/orders/:id/status', VendorOrderController.updateVendorOrderStatus);

// ==================== VENDOR PRODUCT ROUTES ====================
router.get('/products', VendorProductController.getVendorProducts);
router.get('/products/stats', VendorProductController.getVendorProductStats);
router.get('/products/:id', VendorProductController.getVendorProductById);
router.post('/products', VendorProductController.createVendorProduct);
router.put('/products/:id', VendorProductController.updateVendorProduct);
router.delete('/products/:id', VendorProductController.deleteVendorProduct);

// ==================== VENDOR REVIEW ROUTES ====================
router.get('/reviews', VendorReviewController.getVendorReviews);
router.get('/reviews/stats', VendorReviewController.getVendorReviewStats);
router.get('/reviews/:id', VendorReviewController.getVendorReviewById);
router.put('/reviews/:id/reply', VendorReviewController.replyToReview);
router.put('/reviews/:id/status', VendorReviewController.updateReviewStatus);

// ==================== VENDOR ANALYTICS ROUTES ====================
router.get('/analytics', VendorAnalyticsController.getVendorAnalytics);
router.get('/earnings', VendorAnalyticsController.getVendorEarnings);
router.get('/transactions', VendorAnalyticsController.getTransactionHistory);
router.get('/revenue-chart', VendorAnalyticsController.getRevenueChartData);

module.exports = router;
