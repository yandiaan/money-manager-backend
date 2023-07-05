const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  // Periksa apakah token ada
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Menambahkan ID pengguna yang ada di token ke objek request
    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
