const express = require('express');

const router = express.Router();

// Controllers
const userCtrl = require('./controllers/user');

// User
router.put('/user/edit', userCtrl.putUserById);
router.post('/user/create', userCtrl.postRegister);
router.get('/user/:id', userCtrl.getUserById);
router.post('/login', userCtrl.postLogin);

module.exports = router;
