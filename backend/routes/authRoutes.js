const express = require('express');
const { registerUser, loginUser, google, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/gmail', google);
router.post('/signout', logout);

module.exports = router;
