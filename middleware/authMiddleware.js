const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Frontend theke "Bearer <token>" format e header asbe
  const token = req.header('Authorization')?.split(' ')[1]; 
  
  if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Verified user er data request e save kore nilam
    next(); // Next function (controller) e pass kora
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = { verifyToken };