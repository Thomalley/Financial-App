const express = require('express');

const router = express.Router();

// Middlewares

// Controllers
const authCtrl = require('./controllers/auth');
const userCtrl = require('./controllers/user');

// Auth
router.post('/auth/login', authCtrl.postLogin);
router.post('/user/create', authCtrl.postRegister);
router.post('/auth/recover-password', authCtrl.recoverPassword);
router.post('/auth/reset-password', authCtrl.resetPassword);
router.get('/auth/users/:id', authCtrl.getUserById);
// router.post('/auth/user-verification', authCtrl.userVerification);

// User
router.put('/user/edit', userCtrl.putUserById);
router.delete('/user/:id', userCtrl.deleteUser);

module.exports = router;
