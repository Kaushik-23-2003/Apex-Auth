const express = require('express');
const verifyToken = require('../utils/verifyUser'); 
const { getUserDetails, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();


router.get('/update/:id', verifyToken, getUserDetails);
router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;
