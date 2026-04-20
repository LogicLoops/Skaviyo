const pool = require('../../config/database');

class AdminVendorController {
    // Get all vendors with pagination and filtering
    static async getAllVendors(req, res) {
        try {
            if (!req.user || !req.user.id) {
                console.log('[ADMIN_VENDOR_CONTROLLER] Unauthorized: No user in request');
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized: Admin not authenticated'
                });
            }

            if (req.user.role !== 'ADMIN') {
                console.log('[ADMIN_VENDOR_CONTROLLER] User is not an admin. Role:', req.user.role);
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: Only admins can access this resource'
                });
            }

            const { status, search, page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            let query = `
                SELECT 
                    v.id,
                    v.user_id,
                    v.store_name,
                    v.gst_number,
                    v.bank_account,
                    v.status,
                    v.created_at,
                    u.name,
                    u.email,
                    u.phone
                FROM vendors v
                JOIN users u ON v.user_id = u.id
                WHERE 1=1
            `;
            const params = [];

            // Add status filter
            if (status) {
                query += ` AND v.status = ?`;
                params.push(status.toUpperCase());
            }

            // Add search filter (MySQL LIKE is case-insensitive by default)
            if (search) {
                query += ` AND (v.store_name LIKE ? OR u.name LIKE ? OR u.email LIKE ?)`;
                params.push(`%${search}%`, `%${search}%`, `%${search}%`);
            }

            query += ` ORDER BY v.created_at DESC LIMIT ? OFFSET ?`;
            params.push(parseInt(limit), parseInt(offset));

            const [result] = await pool.query(query, params);

            // Get total count
            let countQuery = `
                SELECT COUNT(*) as total
                FROM vendors v
                JOIN users u ON v.user_id = u.id
                WHERE 1=1
            `;
            const countParams = [];

            if (status) {
                countQuery += ` AND v.status = ?`;
                countParams.push(status.toUpperCase());
            }

            if (search) {
                countQuery += ` AND (v.store_name LIKE ? OR u.name LIKE ? OR u.email LIKE ?)`;
                countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
            }

            const [countResult] = await pool.query(countQuery, countParams);
            const totalCount = parseInt(countResult[0].total, 10);
            const totalPages = Math.ceil(totalCount / limit);

            console.log(`[ADMIN_VENDOR_CONTROLLER] Retrieved ${result.length} vendors (Page ${page}/${totalPages})`);

            return res.status(200).json({
                success: true,
                message: 'Vendors retrieved successfully',
                data: result.map(vendor => ({
                    id: vendor.id,
                    userId: vendor.user_id,
                    storeName: vendor.store_name,
                    vendorName: vendor.name,
                    email: vendor.email,
                    phone: vendor.phone,
                    gstNumber: vendor.gst_number,
                    bankAccount: vendor.bank_account,
                    status: vendor.status,
                    createdAt: vendor.created_at
                })),
                pagination: {
                    currentPage: parseInt(page, 10),
                    totalPages,
                    totalCount,
                    perPage: parseInt(limit, 10)
                }
            });
        } catch (error) {
            console.error('[ADMIN_VENDOR_CONTROLLER] Error fetching vendors:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Get vendor details by ID
    static async getVendorDetails(req, res) {
        try {
            if (!req.user || !req.user.id) {
                console.log('[ADMIN_VENDOR_CONTROLLER] Unauthorized: No user in request');
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized: Admin not authenticated'
                });
            }

            if (req.user.role !== 'ADMIN') {
                console.log('[ADMIN_VENDOR_CONTROLLER] User is not an admin. Role:', req.user.role);
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: Only admins can access this resource'
                });
            }

            const { id } = req.params;

            const query = `
                SELECT 
                    v.id,
                    v.user_id,
                    v.store_name,
                    v.gst_number,
                    v.bank_account,
                    v.status,
                    v.created_at,
                    u.name,
                    u.email,
                    u.phone,
                    COUNT(DISTINCT p.id) as total_products,
                    COUNT(DISTINCT oi.order_id) as total_orders,
                    COALESCE(SUM(oi.price * oi.quantity), 0) as total_revenue
                FROM vendors v
                JOIN users u ON v.user_id = u.id
                LEFT JOIN products p ON v.id = p.vendor_id
                LEFT JOIN order_items oi ON v.id = oi.vendor_id
                WHERE v.id = ?
                GROUP BY v.id, v.user_id, v.store_name, v.gst_number, v.bank_account, v.status, v.created_at, u.name, u.email, u.phone
            `;

            const [result] = await pool.query(query, [id]);

            if (result.length === 0) {
                console.log('[ADMIN_VENDOR_CONTROLLER] Vendor not found:', id);
                return res.status(404).json({
                    success: false,
                    message: 'Vendor not found'
                });
            }

            const vendor = result[0];

            console.log(`[ADMIN_VENDOR_CONTROLLER] Retrieved vendor details for ID: ${id}`);

            return res.status(200).json({
                success: true,
                message: 'Vendor details retrieved successfully',
                data: {
                    id: vendor.id,
                    userId: vendor.user_id,
                    storeName: vendor.store_name,
                    vendorName: vendor.name,
                    email: vendor.email,
                    phone: vendor.phone,
                    gstNumber: vendor.gst_number,
                    bankAccount: vendor.bank_account,
                    status: vendor.status,
                    totalProducts: parseInt(vendor.total_products, 10),
                    totalOrders: parseInt(vendor.total_orders, 10),
                    totalRevenue: parseFloat(vendor.total_revenue).toFixed(2),
                    createdAt: vendor.created_at
                }
            });
        } catch (error) {
            console.error('[ADMIN_VENDOR_CONTROLLER] Error fetching vendor details:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Update vendor status (Verify/Unverify/Suspend)
    static async updateVendorStatus(req, res) {
        try {
            if (!req.user || !req.user.id) {
                console.log('[ADMIN_VENDOR_CONTROLLER] Unauthorized: No user in request');
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized: Admin not authenticated'
                });
            }

            if (req.user.role !== 'ADMIN') {
                console.log('[ADMIN_VENDOR_CONTROLLER] User is not an admin. Role:', req.user.role);
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: Only admins can access this resource'
                });
            }

            const { id } = req.params;
            const { status } = req.body;

            // Validate status
            const validStatuses = ['PENDING', 'ACTIVE', 'SUSPENDED'];
            if (!status || !validStatuses.includes(status.toUpperCase())) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}`
                });
            }

            const updateQuery = `
                UPDATE vendors
                SET status = ?
                WHERE id = ?
            `;

            const [result] = await pool.query(updateQuery, [status.toUpperCase(), id]);

            if (result.affectedRows === 0) {
                console.log('[ADMIN_VENDOR_CONTROLLER] Vendor not found for status update:', id);
                return res.status(404).json({
                    success: false,
                    message: 'Vendor not found'
                });
            }

            // Fetch updated vendor
            const [vendorData] = await pool.query(
                'SELECT id, store_name, status, created_at, user_id FROM vendors WHERE id = ?',
                [id]
            );
            const vendor = vendorData[0];

            console.log(`[ADMIN_VENDOR_CONTROLLER] Vendor status updated to ${status} for vendor ID: ${id}`);

            return res.status(200).json({
                success: true,
                message: `Vendor ${status === 'ACTIVE' ? 'verified' : status === 'SUSPENDED' ? 'suspended' : 'updated'} successfully`,
                data: {
                    id: vendor.id,
                    storeName: vendor.store_name,
                    status: vendor.status,
                    createdAt: vendor.created_at
                }
            });
        } catch (error) {
            console.error('[ADMIN_VENDOR_CONTROLLER] Error updating vendor status:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // Delete vendor
    static async deleteVendor(req, res) {
        try {
            if (!req.user || !req.user.id) {
                console.log('[ADMIN_VENDOR_CONTROLLER] Unauthorized: No user in request');
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized: Admin not authenticated'
                });
            }

            if (req.user.role !== 'ADMIN') {
                console.log('[ADMIN_VENDOR_CONTROLLER] User is not an admin. Role:', req.user.role);
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: Only admins can access this resource'
                });
            }

            const { id } = req.params;

            // Get vendor info before deleting
            const checkQuery = `SELECT id, store_name FROM vendors WHERE id = ?`;
            const [checkResult] = await pool.query(checkQuery, [id]);

            if (checkResult.length === 0) {
                console.log('[ADMIN_VENDOR_CONTROLLER] Vendor not found for deletion:', id);
                return res.status(404).json({
                    success: false,
                    message: 'Vendor not found'
                });
            }

            const vendor = checkResult[0];

            // Delete vendor (CASCADE will handle related records)
            const deleteQuery = `DELETE FROM vendors WHERE id = ?`;
            await pool.query(deleteQuery, [id]);

            console.log(`[ADMIN_VENDOR_CONTROLLER] Vendor deleted with ID: ${id}`);

            return res.status(200).json({
                success: true,
                message: 'Vendor deleted successfully',
                data: {
                    id: vendor.id,
                    storeName: vendor.store_name
                }
            });
        } catch (error) {
            console.error('[ADMIN_VENDOR_CONTROLLER] Error deleting vendor:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}

module.exports = AdminVendorController;
