const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

// Rute untuk registrasi
router.post("/register", auth.register);

// Rute untuk login
router.post("/login", auth.login);

module.exports = router;
