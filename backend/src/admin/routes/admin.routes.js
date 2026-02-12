const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const AdminUserControllers = require('../controllers/admin.user.controllers');
const AdminVendorControllers = require('../controllers/admin.vendor.controllers');
const { verifyToken } = require('../../authorization/middleware/auth');

// All routes below require authentication
router.use(verifyToken);

// Get current admin's details
router.get('/me', AdminController.getAdminDetails);

// Get all admins
router.get('/all', AdminController.getAllAdmins);

// Update current admin's details
router.put('/update', AdminController.updateAdminDetails);

// Get all users filtered by role with summary
router.get('/users/all-by-role', AdminController.getUsersByRole);

// Get users by specific role (e.g., /admin/users/role/CUSTOMER)
router.get('/users/role/:role', AdminController.getUsersBySpecificRole);

// Get total revenue
router.get('/total-revenue', AdminController.getTotalRevenue);

// Get total orders
router.get('/total-orders', AdminController.getTotalOrcers);

// Get orders by status
router.get('/orders/status/:status', AdminController.getOrdersByStatus);

// Get order status breakdown (count by status)
router.get('/orders/status-breakdown', AdminController.getOrderStatusBreakdown);

// Get top selling products
router.get('/top-selling-products', AdminController.getTopSellingProducts);
// Customer management routes
router.get('/customers/all', AdminUserControllers.getAllCustomers);

router.get('/customers/:id', AdminUserControllers.getCustomerDetailWithOrders);

router.put('/customers/:id/status', AdminUserControllers.deactivateCustomer);

router.delete('/customers/:id', AdminUserControllers.deleteCustomer);

router.get('/user-details/:id', AdminUserControllers.getUserDetailsById);

// Vendor management routes
router.get('/vendors/all', AdminVendorControllers.getAllVendors);

router.get('/vendors/:id', AdminVendorControllers.getVendorDetails);

router.put('/vendors/:id/status', AdminVendorControllers.updateVendorStatus);

router.delete('/vendors/:id', AdminVendorControllers.deleteVendor);

module.exports = router;

