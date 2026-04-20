const pool = require('../../config/database');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'skaviyo_dev';

class AdminUserController {
    // Get user details by ID
    static async getUserDetailsById(req, res) {
        try {
            const userId = req.params.id;
            console.log(`[ADMIN_USER_CONTROLLER] Fetching details for user ID: ${userId}`);

            const query = 'SELECT id, email, role, status, created_at FROM users WHERE id = ?';
            const [rows] = await pool.query(query, [userId]);

            if (rows.length === 0) {
                console.log(`[ADMIN_USER_CONTROLLER] No user found with ID: ${userId}`);
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            const userDetails = rows[0];
            console.log(`[ADMIN_USER_CONTROLLER] User details retrieved for ID: ${userId}`);
            res.json({
                success: true,
                data: userDetails
            });
        } catch (error) {
            console.error(`[ADMIN_USER_CONTROLLER] Error fetching user details: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Get all customers with order count and total spent
    static async getAllCustomers(req, res) {
        try {
            if (!req.user || !req.user.id) {
                console.log('[ADMIN_USER_CONTROLLER] Unauthorized: No user in request');
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized: Admin not authenticated'
                });
            }

            if (req.user.role !== 'ADMIN') {
                console.log('[ADMIN_USER_CONTROLLER] User is not an admin. Role:', req.user.role);
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: Only admins can access this resource'
                });
            }

            const query = `
                SELECT 
                    u.id,
                    u.name,
                    u.email,
                    u.status,
                    u.created_at,
                    COUNT(o.id) as total_orders,
                    COALESCE(SUM(o.total_amount), 0) as total_spent
                FROM users u
                LEFT JOIN orders o ON u.id = o.user_id
                WHERE u.role = 'CUSTOMER'
                GROUP BY u.id, u.name, u.email, u.status, u.created_at
                ORDER BY u.created_at DESC
            `;

            const [result] = await pool.query(query);

            console.log(`[ADMIN_USER_CONTROLLER] Retrieved ${result.length} customers`);

            return res.status(200).json({
                success: true,
                message: 'Customers retrieved successfully',
                data: result.map(customer => ({
                    id: customer.id,
                    name: customer.name,
                    email: customer.email,
                    status: customer.status,
                    totalOrders: parseInt(customer.total_orders, 10),
                    totalSpent: parseFloat(customer.total_spent).toFixed(2),
                    createdAt: customer.created_at
                }))
            });
        } catch (error) {
            console.error('[ADMIN_USER_CONTROLLER] Error fetching customers:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Get customer details with all their orders
    static async getCustomerDetailWithOrders(req, res) {
        try {
            if (!req.user || !req.user.id) {
                console.log('[ADMIN_USER_CONTROLLER] Unauthorized: No user in request');
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized: Admin not authenticated'
                });
            }

            if (req.user.role !== 'ADMIN') {
                console.log('[ADMIN_USER_CONTROLLER] User is not an admin. Role:', req.user.role);
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: Only admins can access this resource'
                });
            }

            const { id } = req.params;

            // Get customer details
            const customerQuery = `
                SELECT 
                    u.id,
                    u.name,
                    u.email,
                    u.phone,
                    u.status,
                    u.created_at,
                    COUNT(o.id) as total_orders,
                    COALESCE(SUM(o.total_amount), 0) as total_spent
                FROM users u
                LEFT JOIN orders o ON u.id = o.user_id
                WHERE u.id = ? AND u.role = 'CUSTOMER'
                GROUP BY u.id, u.name, u.email, u.phone, u.status, u.created_at
            `;

            const [customerResult] = await pool.query(customerQuery, [id]);

            if (customerResult.length === 0) {
                console.log('[ADMIN_USER_CONTROLLER] Customer not found:', id);
                return res.status(404).json({
                    success: false,
                    message: 'Customer not found'
                });
            }

            const customer = customerResult[0];

            // Get customer's orders with items
            const ordersQuery = `
                SELECT 
                    o.id,
                    o.order_number,
                    o.total_amount,
                    o.order_status,
                    o.payment_status,
                    o.created_at,
                    JSON_ARRAYAGG(JSON_OBJECT(
                        'id', oi.id,
                        'productVariantId', oi.product_variant_id,
                        'quantity', oi.quantity,
                        'price', oi.price,
                        'itemStatus', oi.item_status
                    )) as items
                FROM orders o
                LEFT JOIN order_items oi ON o.id = oi.order_id
                WHERE o.user_id = ?
                GROUP BY o.id
                ORDER BY o.created_at DESC
            `;

            const [ordersResult] = await pool.query(ordersQuery, [id]);

            console.log(`[ADMIN_USER_CONTROLLER] Retrieved customer details with ${ordersResult.length} orders for customer ID: ${id}`);

            return res.status(200).json({
                success: true,
                message: 'Customer details retrieved successfully',
                data: {
                    id: customer.id,
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone,
                    status: customer.status,
                    totalOrders: parseInt(customer.total_orders, 10),
                    totalSpent: parseFloat(customer.total_spent).toFixed(2),
                    createdAt: customer.created_at,
                    orders: ordersResult.map(order => ({
                        id: order.id,
                        orderNumber: order.order_number,
                        totalAmount: parseFloat(order.total_amount).toFixed(2),
                        orderStatus: order.order_status,
                        paymentStatus: order.payment_status,
                        createdAt: order.created_at,
                        items: order.items ? JSON.parse(order.items).length : 0
                    }))
                }
            });
        } catch (error) {
            console.error('[ADMIN_USER_CONTROLLER] Error fetching customer details:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Deactivate/Block a customer
    static async deactivateCustomer(req, res) {
        try {
            if (!req.user || !req.user.id) {
                console.log('[ADMIN_USER_CONTROLLER] Unauthorized: No user in request');
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized: Admin not authenticated'
                });
            }

            if (req.user.role !== 'ADMIN') {
                console.log('[ADMIN_USER_CONTROLLER] User is not an admin. Role:', req.user.role);
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: Only admins can access this resource'
                });
            }

            const { id } = req.params;
            const { status } = req.body;

            // Validate status
            const validStatuses = ['ACTIVE', 'INACTIVE', 'BLOCKED'];
            if (!status || !validStatuses.includes(status.toUpperCase())) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}`
                });
            }

            const updateQuery = `
                UPDATE users
                SET status = ?
                WHERE id = ? AND role = 'CUSTOMER'
            `;

            const [result] = await pool.query(updateQuery, [status.toUpperCase(), id]);

            if (result.affectedRows === 0) {
                console.log('[ADMIN_USER_CONTROLLER] Customer not found for status update:', id);
                return res.status(404).json({
                    success: false,
                    message: 'Customer not found'
                });
            }

            // Fetch updated customer
            const [customerData] = await pool.query(
                'SELECT id, name, email, status, created_at FROM users WHERE id = ?',
                [id]
            );
            const customer = customerData[0];

            console.log(`[ADMIN_USER_CONTROLLER] Customer ${id} status updated to ${status.toUpperCase()}`);

            return res.status(200).json({
                success: true,
                message: `Customer status updated to ${status.toUpperCase()} successfully`,
                data: {
                    id: customer.id,
                    name: customer.name,
                    email: customer.email,
                    status: customer.status,
                    createdAt: customer.created_at
                }
            });
        } catch (error) {
            console.error('[ADMIN_USER_CONTROLLER] Error deactivating customer:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Delete a customer
    static async deleteCustomer(req, res) {
        try {
            if (!req.user || !req.user.id) {
                console.log('[ADMIN_USER_CONTROLLER] Unauthorized: No user in request');
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized: Admin not authenticated'
                });
            }

            if (req.user.role !== 'ADMIN') {
                console.log('[ADMIN_USER_CONTROLLER] User is not an admin. Role:', req.user.role);
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: Only admins can access this resource'
                });
            }

            const { id } = req.params;

            // Get customer info before deleting
            const checkQuery = `SELECT id, name, email FROM users WHERE id = ? AND role = 'CUSTOMER'`;
            const [checkResult] = await pool.query(checkQuery, [id]);

            if (checkResult.length === 0) {
                console.log('[ADMIN_USER_CONTROLLER] Customer not found for deletion:', id);
                return res.status(404).json({
                    success: false,
                    message: 'Customer not found'
                });
            }

            const customerInfo = checkResult[0];

            // Delete customer (CASCADE will handle related records)
            const deleteQuery = `DELETE FROM users WHERE id = ? AND role = 'CUSTOMER'`;
            await pool.query(deleteQuery, [id]);

            console.log(`[ADMIN_USER_CONTROLLER] Customer ${id} deleted successfully`);

            return res.status(200).json({
                success: true,
                message: 'Customer deleted successfully',
                data: {
                    id: customerInfo.id,
                    name: customerInfo.name,
                    email: customerInfo.email
                }
            });
        } catch (error) {
            console.error('[ADMIN_USER_CONTROLLER] Error deleting customer:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}

module.exports = AdminUserController;
