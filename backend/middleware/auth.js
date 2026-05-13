const jwt = require('jsonwebtoken');
const { getConfig } = require('../config');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const config = getConfig();
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

const generateToken = (userId) => {
  const config = getConfig();
  return jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

module.exports = { authenticateToken, generateToken };
