const express = require('express');
const router = express.Router();

const {
    login,
    register
} = require('../controllers/user.controller.js');

console.log('login:', typeof login);
console.log('register:', typeof register);

router.post('/login', login);
router.post('/register', register);

module.exports = router;