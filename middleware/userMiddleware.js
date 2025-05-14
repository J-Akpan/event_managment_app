const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models/User')

authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.privateKey, (err, verify) => {
    if (err || !verify) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Safely destructure properties only if verify is valid
    const { userId, username, email, userType } = verify;
    req.user = { userId, username, email, userType }; // Attach user info to request
    next();
  });
};

module.exports ={
  authenticateToken
}



