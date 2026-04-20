const pool = require('../../config/database');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'skaviyo_dev';

class AdminController {
  // Get logged-in admin details
  static async getAdminDetails(req, res) {
    try {
      // Check if user is authenticated
      if (!req.user || !req.user.id) {
        console.log('[ADMIN_CONTROLLER] Unauthorized: No user in request');
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Admin not authenticated'
        });
      }

      const userId = req.user.id;
      const userRole = req.user.role;

      console.log('[ADMIN_CONTROLLER] Fetching admin details for user:', userId, 'with role:', userRole);

      // Check if user role is ADMIN
      if (userRole !== 'ADMIN') {
        console.log('[ADMIN_CONTROLLER] User is not an admin. Role:', userRole);
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can access this resource'
        });
      }

      // Query the users table to get admin details
      const query = `
        SELECT 
          id,
          name,
          email,
          role,
          status,
          created_at
        FROM users
        WHERE id = ? AND role = 'ADMIN'
      `;

      const [result] = await pool.query(query, [userId]);

      // Check if admin exists
      if (result.length === 0) {
        console.log('[ADMIN_CONTROLLER] Admin not found for id:', userId);
        return res.status(404).json({
          success: false,
          message: 'Admin not found'
        });
      }

      const admin = result[0];

      console.log('[ADMIN_CONTROLLER] Admin details retrieved successfully for:', admin.email);

      // Return admin details
      return res.status(200).json({
        success: true,
        message: 'Admin details retrieved successfully',
        data: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          status: admin.status,
          createdAt: admin.created_at
        }
      });

    } catch (error) {
      console.error('[ADMIN_CONTROLLER] Error fetching admin details:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get all admins (admin only)
  static async getAllAdmins(req, res) {
    try {
      // Check if user is authenticated
      if (!req.user || !req.user.id) {
        console.log('[ADMIN_CONTROLLER] Unauthorized: No user in request');
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Admin not authenticated'
        });
      }

      const userRole = req.user.role;

      // Check if user role is ADMIN
      if (userRole !== 'ADMIN') {
        console.log('[ADMIN_CONTROLLER] User is not an admin. Role:', userRole);
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can access this resource'
        });
      }

      // Query all admins
      const query = `
        SELECT 
          id,
          name,
          email,
          role,
          status,
          created_at
        FROM users
        WHERE role = 'ADMIN'
        ORDER BY created_at DESC
      `;

      const [result] = await pool.query(query);

      console.log('[ADMIN_CONTROLLER] Retrieved', result.length, 'admins');

      return res.status(200).json({
        success: true,
        message: 'Admins retrieved successfully',
        data: result.map(admin => ({
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          status: admin.status,
          createdAt: admin.created_at
        }))
      });

    } catch (error) {
      console.error('[ADMIN_CONTROLLER] Error fetching admins:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Update admin details (admin only)
  static async updateAdminDetails(req, res) {
    try {
      // Check if user is authenticated
      if (!req.user || !req.user.id) {
        console.log('[ADMIN_CONTROLLER] Unauthorized: No user in request');
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Admin not authenticated'
        });
      }

      const userId = req.user.id;
      const userRole = req.user.role;

      // Check if user role is ADMIN
      if (userRole !== 'ADMIN') {
        console.log('[ADMIN_CONTROLLER] User is not an admin. Role:', userRole);
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can access this resource'
        });
      }

      const { name, email } = req.body;

      // Validate input
      if (!name || !email) {
        console.log('[ADMIN_CONTROLLER] Missing required fields: name or email');
        return res.status(400).json({
          success: false,
          message: 'Name and email are required'
        });
      }

      // Update admin details
      const query = `
        UPDATE users
        SET name = ?, email = ?
        WHERE id = ? AND role = 'ADMIN'
      `;

      const [result] = await pool.query(query, [name, email, userId]);

      if (result.affectedRows === 0) {
        console.log('[ADMIN_CONTROLLER] Admin not found for update:', userId);
        return res.status(404).json({
          success: false,
          message: 'Admin not found'
        });
      }

      // Fetch updated admin
      const [adminData] = await pool.query(
        'SELECT id, name, email, role, status, created_at FROM users WHERE id = ? AND role = ?',
        [userId, 'ADMIN']
      );
      const admin = adminData[0];

      console.log('[ADMIN_CONTROLLER] Admin details updated successfully for:', admin.email);

      return res.status(200).json({
        success: true,
        message: 'Admin details updated successfully',
        data: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          status: admin.status,
          createdAt: admin.created_at
        }
      });

    } catch (error) {
      console.error('[ADMIN_CONTROLLER] Error updating admin details:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get all users with count by role (admin only)
  static async getUsersByRole(req, res) {
    try {
      // Check if user is authenticated
      if (!req.user || !req.user.id) {
        console.log('[ADMIN_CONTROLLER] Unauthorized: No user in request');
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Admin not authenticated'
        });
      }

      // Check if user role is ADMIN
      if (req.user.role !== 'ADMIN') {
        console.log('[ADMIN_CONTROLLER] User is not an admin. Role:', req.user.role);
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can access this resource'
        });
      }

      // Get count by role
      const countQuery = `
        SELECT 
          role,
          COUNT(*) as count
        FROM users
        GROUP BY role
        ORDER BY count DESC
      `;

      const [countResult] = await pool.query(countQuery);

      // Get detailed user list by role
      const usersQuery = `
        SELECT 
          id,
          name,
          email,
          role,
          status,
          created_at
        FROM users
        ORDER BY role ASC, created_at DESC
      `;

      const [usersResult] = await pool.query(usersQuery);

      console.log('[ADMIN_CONTROLLER] Retrieved users by role');

      // Format the response
      const roleCounts = {};
      countResult.forEach(row => {
        roleCounts[row.role] = parseInt(row.count, 10);
      });

      return res.status(200).json({
        success: true,
        message: 'Users retrieved successfully filtered by role',
        data: {
          summary: roleCounts,
          totalUsers: usersResult.length,
          users: usersResult.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            createdAt: user.created_at
          }))
        }
      });
    } catch (error) {
      console.error('[ADMIN_CONTROLLER] Error fetching users by role:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get users by specific role (admin only)
  static async getUsersBySpecificRole(req, res) {
    try {
      // Check if user is authenticated
      if (!req.user || !req.user.id) {
        console.log('[ADMIN_CONTROLLER] Unauthorized: No user in request');
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Admin not authenticated'
        });
      }

      // Check if user role is ADMIN
      if (req.user.role !== 'ADMIN') {
        console.log('[ADMIN_CONTROLLER] User is not an admin. Role:', req.user.role);
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can access this resource'
        });
      }

      const { role } = req.params;

      // Validate role parameter
      const validRoles = ['ADMIN', 'VENDOR', 'CUSTOMER'];
      if (!role || !validRoles.includes(role.toUpperCase())) {
        console.log('[ADMIN_CONTROLLER] Invalid role:', role);
        return res.status(400).json({
          success: false,
          message: `Invalid role. Valid roles are: ${validRoles.join(', ')}`
        });
      }

      const query = `
        SELECT 
          id,
          name,
          email,
          role,
          status,
          created_at
        FROM users
        WHERE role = ?
        ORDER BY created_at DESC
      `;

      const [result] = await pool.query(query, [role.toUpperCase()]);

      console.log(`[ADMIN_CONTROLLER] Retrieved ${result.length} users with role: ${role}`);

      return res.status(200).json({
        success: true,
        message: `Users with role '${role.toUpperCase()}' retrieved successfully`,
        data: {
          role: role.toUpperCase(),
          count: result.length,
          users: result.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            createdAt: user.created_at
          }))
        }
      });
    } catch (error) {
      console.error('[ADMIN_CONTROLLER] Error fetching users by specific role:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getTotalRevenue(req, res) {
    try {
      // Check if user is authenticated
      if (!req.user || !req.user.id) {
        console.log('[ADMIN_CONTROLLER] Unauthorized: No user in request');
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Admin not authenticated'
        });
      }

      // Check if user role is ADMIN
      if (req.user.role !== 'ADMIN') {
        console.log('[ADMIN_CONTROLLER] User is not an admin. Role:', req.user.role);
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can access this resource'
        });
      }

      const [totalRevenue] = await pool.query(`
        SELECT SUM(amount) as total
        FROM payments
        WHERE status = 'PAID'
      `);

      console.log('\n💰 Total Revenue (Successful Payments):');
      console.log('─'.repeat(40));
      console.log(`$${parseFloat(totalRevenue[0].total || 0).toFixed(2)}`);

      return res.status(200).json({
        success: true,
        message: 'Total revenue retrieved successfully',
        data: {
          totalRevenue: parseFloat(totalRevenue[0].total || 0).toFixed(2)
        }
      });
    } catch (error) {
      console.error('[ADMIN_CONTROLLER] Error fetching total revenue:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getTotalOrcers(req, res) {
    try {
      // Check if user is authenticated
      if (!req.user || !req.user.id) {
        console.log('[ADMIN_CONTROLLER] Unauthorized: No user in request');
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Admin not authenticated'
        });
      }

      // Check if user role is ADMIN
      if (req.user.role !== 'ADMIN') {
        console.log('[ADMIN_CONTROLLER] User is not an admin. Role:', req.user.role);
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can access this resource'
        });
      }

      const [totalOrders] = await pool.query(`
        SELECT COUNT(*) as total
        FROM orders
      `);

      console.log('\n📦 Total Orders:');
      console.log('─'.repeat(40));
      console.log(`${totalOrders[0].total} orders`);

      return res.status(200).json({
        success: true,
        message: 'Total orders retrieved successfully',
        data: {
          totalOrders: parseInt(totalOrders[0].total, 10)
        }
      });
    } catch (error) {
      console.error('[ADMIN_CONTROLLER] Error fetching total orders:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getOrdersByStatus(req, res) {
    if (!req.user || !req.user.id) {
      console.log('[ADMIN_CONTROLLER] Unauthorized: No user in request');
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Admin not authenticated'
      });
    }

    if (req.user.role !== 'ADMIN') {
      console.log('[ADMIN_CONTROLLER] User is not an admin. Role:', req.user.role);
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Only admins can access this resource'
      });
    }

    const { status } = req.params;

    const validStatuses = ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!status || !validStatuses.includes(status.toUpperCase())) {
      console.log('[ADMIN_CONTROLLER] Invalid order status:', status);
      return res.status(400).json({
        success: false,
        message: `Invalid order status. Valid statuses are: ${validStatuses.join(', ')}`
      });
    }

    try {
      const [ordersResult] = await pool.query(`
        SELECT 
          id,
          order_number,
          user_id,
          total_amount,
          order_status,
          created_at
        FROM orders
        WHERE order_status = ?
        ORDER BY created_at DESC
      `, [status.toUpperCase()]);

      console.log(`[ADMIN_CONTROLLER] Retrieved ${ordersResult.length} orders with status: ${status}`);

      return res.status(200).json({
        success: true,
        message: `Orders with status '${status.toUpperCase()}' retrieved successfully`,
        data: {
          status: status.toUpperCase(),
          count: ordersResult.length,
          orders: ordersResult.map(order => ({
            id: order.id,
            orderNumber: order.order_number,
            userId: order.user_id,
            totalAmount: parseFloat(order.total_amount).toFixed(2),
            orderStatus: order.order_status,
            createdAt: order.created_at
          }))
        }
      });
    } catch (error) {
      console.error('[ADMIN_CONTROLLER] Error fetching orders by status:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }   
  }
  

static async getTopSellingProducts(req, res) {
  try {
    if (!req.user || !req.user.id) {
      console.log('[ADMIN_CONTROLLER] Unauthorized: No user in request');
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Admin not authenticated'
      });
    }

    if (req.user.role !== 'ADMIN') {
      console.log('[ADMIN_CONTROLLER] User is not an admin. Role:', req.user.role);
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Only admins can access this resource'
      });
    }

    const [topProductsResult] = await pool.query(`
      SELECT 
        p.id,
        p.title AS name,
        SUM(oi.quantity) as total_sold
      FROM order_items oi
      JOIN product_variants pv 
        ON oi.product_variant_id = pv.id
      JOIN products p 
        ON pv.product_id = p.id
      JOIN orders o 
        ON oi.order_id = o.id
      WHERE o.order_status IN ('SHIPPED', 'DELIVERED')
      GROUP BY p.id
      ORDER BY total_sold DESC
      LIMIT 5
    `);

    console.log('[ADMIN_CONTROLLER] Retrieved top selling products');

    return res.status(200).json({
      success: true,
      message: 'Top selling products retrieved successfully',
      data: topProductsResult.map(product => ({
        id: product.id,
        name: product.name,
        totalSold: parseInt(product.total_sold, 10)
      }))
    });
  } catch (error) {
    console.error('[ADMIN_CONTROLLER] Error fetching top selling products:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

static async getOrderStatusBreakdown(req, res) {
  try {
    if (!req.user || !req.user.id) {
      console.log('[ADMIN_CONTROLLER] Unauthorized: No user in request');
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Admin not authenticated'
      });
    }

    if (req.user.role !== 'ADMIN') {
      console.log('[ADMIN_CONTROLLER] User is not an admin. Role:', req.user.role);
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Only admins can access this resource'
      });
    }

    const { category } = req.query;
    const validCategories = ['DELIVERED', 'SHIPPED', 'CANCELLED', 'PENDING'];

    // If category is provided, fetch specific order data for that category
    if (category && validCategories.includes(category.toUpperCase())) {
      const categoryUpper = category.toUpperCase();
      const [ordersResult] = await pool.query(`
        SELECT 
          id,
          order_number,
          user_id,
          total_amount,
          order_status,
          created_at
        FROM orders
        WHERE order_status = ?
        ORDER BY created_at DESC
      `, [categoryUpper]);

      console.log(`[ADMIN_CONTROLLER] Retrieved ${ordersResult.length} orders with status: ${categoryUpper}`);

      return res.status(200).json({
        success: true,
        message: `Orders with status '${categoryUpper}' retrieved successfully`,
        data: {
          status: categoryUpper,
          count: ordersResult.length,
          orders: ordersResult.map(order => ({
            id: order.id,
            orderNumber: order.order_number,
            userId: order.user_id,
            totalAmount: parseFloat(order.total_amount).toFixed(2),
            orderStatus: order.order_status,
            createdAt: order.created_at
          }))
        }
      });
    }

    // If no category provided, return breakdown of all statuses
    const [statusBreakdownResult] = await pool.query(`
      SELECT 
        order_status,
        COUNT(*) as count
      FROM orders
      GROUP BY order_status
      ORDER BY order_status
    `);

    // Initialize counts for all statuses
    const breakdown = {
      DELIVERED: 0,
      SHIPPED: 0,
      CANCELLED: 0,
      PENDING: 0
    };

    // Populate counts from query results
    statusBreakdownResult.forEach(row => {
      if (breakdown.hasOwnProperty(row.order_status)) {
        breakdown[row.order_status] = parseInt(row.count, 10);
      }
    });

    console.log('[ADMIN_CONTROLLER] Retrieved order status breakdown:', breakdown);

    return res.status(200).json({
      success: true,
      message: 'Order status breakdown retrieved successfully',
      data: breakdown
    });
  } catch (error) {
    console.error('[ADMIN_CONTROLLER] Error fetching order status breakdown:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
}

module.exports = AdminController;
