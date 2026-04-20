# MySQL Query Syntax Quick Reference

## Updated Files
1. ✅ `src/authorization/models/user.js`
2. ✅ `src/admin/controllers/admin.controller.js`
3. ✅ `src/admin/controllers/admin.user.controllers.js`
4. ✅ `src/admin/controllers/admin.vendor.controllers.js`

## Key Changes Summary

### Parameter Binding
```javascript
// PostgreSQL ❌
pool.query('SELECT * FROM users WHERE id = $1', [id])

// MySQL ✅
pool.query('SELECT * FROM users WHERE id = ?', [id])
```

### Result Destructuring
```javascript
// PostgreSQL ❌
const result = await pool.query(query, params);
const user = result.rows[0];

// MySQL ✅
const [rows] = await pool.query(query, params);
const user = rows[0];
```

### Search Operations
```javascript
// PostgreSQL ❌
query += ` AND name ILIKE ?`;

// MySQL ✅
query += ` AND name LIKE ?`;
// (MySQL LIKE is case-insensitive by default)
```

### JSON Operations
```javascript
// PostgreSQL ❌
SELECT json_agg(json_build_object('id', id, 'name', name)) as items

// MySQL ✅
SELECT JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name)) as items
```

### Update Operations (No RETURNING)
```javascript
// PostgreSQL ❌
const result = await pool.query(
  'UPDATE users SET name = $1 WHERE id = $2 RETURNING *',
  [name, id]
);

// MySQL ✅
const [result] = await pool.query(
  'UPDATE users SET name = ? WHERE id = ?',
  [name, id]
);
// Then fetch the updated record separately if needed
```

### Dynamic Queries
```javascript
// MySQL with dynamic parameters
let query = 'SELECT * FROM users WHERE 1=1';
const params = [];

if (status) {
  query += ' AND status = ?';
  params.push(status);
}

const [result] = await pool.query(query, params);
```

## Common MySQL Functions (Verified Working)
- `COUNT(*)` - Aggregate function
- `SUM()` - Sum aggregation
- `COALESCE()` - Null handling
- `NOW()` - Current timestamp
- `JSON_ARRAYAGG()` - JSON array aggregation
- `JSON_OBJECT()` - Create JSON object
- `CONCAT()` - String concatenation
- `CASE WHEN` - Conditional logic

## Database Driver
- **Package:** `mysql2` with promise wrapper
- **Import:** `const mysql = require('mysql2/promise');`
- **Configuration:** Connection pooling with 10 connection limit

## Connection String Format
```
mysql://username:password@hostname:port/database_name
```

Example from .env:
```
DATABASE_URL="mysql://root:vzMYxGjXdrVDSGHwnzwNOJYztIazutGh@maglev.proxy.rlwy.net:22794/railway"
```

---
**All backend queries have been successfully migrated to MySQL syntax!**
