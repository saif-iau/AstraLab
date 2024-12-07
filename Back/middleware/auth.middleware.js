// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) {
      console.error('JWT verification error:', err); // Log error for debugging
      const isExpired = err.name === 'TokenExpiredError';
      const status = isExpired ? 401 : 403; // Use 401 for expired, 403 for invalid
      return res.status(status).json({ 
        message: isExpired ? 'Token expired' : 'Invalid token', 
        error: err.message 
      });
    }

    req.user = user; // Attach decoded user info to request
    next();
  });
};

module.exports = authenticateToken;
