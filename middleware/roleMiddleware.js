// middleware/roleMiddleware.js
function roleMiddleware(requiredRole) {
  return (req, res, next) => {
    const admin = req.admin; // authMiddleware must set req.user
    if (!admin) return res.status(401).json({ message: 'Unauthorized' });
    if (admin.role !== requiredRole)
      return res.status(403).json({ message: 'Forbidden: wrong role' });
    next();
  };
}

module.exports = roleMiddleware; // ✅ Use this for CommonJS
