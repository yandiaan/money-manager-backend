const express = require('express');
    const router = express.Router();
    const user = require('../controllers/user');
    const authMiddleware = require('../middleware/authMiddleware');

    // Rute untuk mendapatkan informasi pengguna
    router.get('/', authMiddleware, user.getUserInfo);
    router.post('/update-saldo', authMiddleware, user.updateSaldo);

    module.exports = router;