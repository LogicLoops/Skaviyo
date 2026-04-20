const pool = require('../../config/database');

class User {
  // Find user by email
  static async findByEmail(email) {
    try {
      console.log(`[USER_MODEL] Finding user by email: ${email}`);
      const [rows] = await pool.query(
        'SELECT id, email, name, password, role, status FROM users WHERE email = ?',
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('[USER_MODEL] Error finding user by email:', error.message);
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      console.log(`[USER_MODEL] Finding user by ID: ${id}`);
      const [rows] = await pool.query(
        'SELECT id, email, name, role, status FROM users WHERE id = ?',
        [id]
      );
      return rows[0] || null;
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
      const [result] = await pool.query(
        'INSERT INTO users (email, name, password, phone, role, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
        [email, name, password, phone, role, status]
      );
      console.log(`[USER_MODEL] User created successfully with ID: ${result.insertId}`);
      return { id: result.insertId, email, name, role };
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
      
      let query = 'UPDATE users SET ';
      const params = [];
      const updates = [];
      
      if (name !== undefined) {
        updates.push('name = ?');
        params.push(name);
      }
      if (password !== undefined) {
        updates.push('password = ?');
        params.push(password);
      }
      if (role !== undefined) {
        updates.push('role = ?');
        params.push(role);
      }
      if (status !== undefined) {
        updates.push('status = ?');
        params.push(status);
      }
      
      updates.push('updated_at = NOW()');
      query += updates.join(', ') + ' WHERE id = ?';
      params.push(id);
      
      await pool.query(query, params);
      
      // Return the updated user
      return this.findById(id);
    } catch (error) {
      console.error('[USER_MODEL] Error updating user:', error.message);
      throw error;
    }
  }

  // Get all users
  static async findAll() {
    try {
      console.log('[USER_MODEL] Fetching all users');
      const [rows] = await pool.query(
        'SELECT id, email, name, role, status FROM users ORDER BY created_at DESC'
      );
      return rows;
    } catch (error) {
      console.error('[USER_MODEL] Error fetching all users:', error.message);
      throw error;
    }
  }

  // Check if user exists
  static async exists(email) {
    try {
      const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
      return rows.length > 0;
    } catch (error) {
      console.error('[USER_MODEL] Error checking user existence:', error.message);
      throw error;
    }
  }
}

module.exports = User;
