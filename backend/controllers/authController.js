const db = require('../config/db');

exports.login = (req, res) => {
  const { id, role } = req.body;
  
  if (!id || !role) {
    return res.status(400).json({ message: 'Missing ID or role' });
  }

  let query;
  if (role === 'student') {
    query = 'SELECT * FROM users WHERE student_id = ? AND role = ?';
  } else {
    query = 'SELECT * FROM users WHERE employee_id = ? AND role = ?';
  }

  db.query(query, [id, role], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    // In real life, use password check. Here skipping for now.

    return res.json({
      user: { id: user.id },
      role: user.role,
      token: 'dummy-token', // Later you can generate JWT
    });
  });
};