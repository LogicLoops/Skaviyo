const pool = require('../../config/database');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'skaviyo_dev';

class AdminUserController {
    // Get user details by ID
    static async getUserDetailsById(req, res) {
        try {
            const userId = req.params.id;
            console.log(`[ADMIN_USER_CONTROLLER] Fetching details for user ID: ${userId}`);

            const query = 'SELECT id, email, role, status, created_at FROM users WHERE id = $1';
            const { rows } = await pool.query(query, [userId]);

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
}

module.exports = AdminUserController;