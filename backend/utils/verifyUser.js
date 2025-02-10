const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Access the token from req.cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Not Authorized'});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or Expired Token' });
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
