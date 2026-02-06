const pool = require('../../config/database');

class User {
  // Find user by email
  static async findByEmail(email) {
    try {
      console.log(`[USER_MODEL] Finding user by email: ${email}`);
      const result = await pool.query(
        'SELECT id, email, name, password, role, status FROM users WHERE email = $1',
        [email]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('[USER_MODEL] Error finding user by email:', error.message);
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      console.log(`[USER_MODEL] Finding user by ID: ${id}`);
      const result = await pool.query(
        'SELECT id, email, name, role, status FROM users WHERE id = $1',
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('[USER_MODEL] Error finding user by ID:', error.message);
      throw error;
    }
  }

  // Create new user
  static async create(userData) {
    try {
      console.log(`[USER_MODEL] Creating new user with email: ${userData.email}`);
      const { email, name, password, phone, role = 'CUSTOMER', status = 'ACTIVE' } = userData;
      const result = await pool.query(
        'INSERT INTO users (email, name, password, phone, role, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING id, email, name, role',
        [email, name, password, phone, role, status]
      );
      console.log(`[USER_MODEL] User created successfully with ID: ${result.rows[0].id}`);
      return result.rows[0];
    } catch (error) {
      console.error('[USER_MODEL] Error creating user:', error.message);
      throw error;
    }
  }

  // Update user
  static async update(id, userData) {
    try {
      console.log(`[USER_MODEL] Updating user with ID: ${id}`);
      const { name, password, role, status } = userData;
      const result = await pool.query(
        'UPDATE users SET name = COALESCE($1, name), password = COALESCE($2, password), role = COALESCE($3, role), status = COALESCE($4, status), updated_at = NOW() WHERE id = $5 RETURNING id, email, name, role, status',
        [name, password, role, status, id]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('[USER_MODEL] Error updating user:', error.message);
      throw error;
    }
  }

  // Get all users
  static async findAll() {
    try {
      console.log('[USER_MODEL] Fetching all users');
      const result = await pool.query(
        'SELECT id, email, name, role, status FROM users ORDER BY created_at DESC'
      );
      return result.rows;
    } catch (error) {
      console.error('[USER_MODEL] Error fetching all users:', error.message);
      throw error;
    }
  }

  // Check if user exists
  static async exists(email) {
    try {
      const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      return result.rows.length > 0;
    } catch (error) {
      console.error('[USER_MODEL] Error checking user existence:', error.message);
      throw error;
    }
  }
}

module.exports = User;
