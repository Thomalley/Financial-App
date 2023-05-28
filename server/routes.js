const express = require('express');

const router = express.Router();

// Middlewares

// Controllers
const authCtrl = require('./controllers/auth');
const userCtrl = require('./controllers/user');

// Auth
router.post('/auth/login', authCtrl.postLogin);
router.post('/auth/register', authCtrl.postRegister);
router.post('/auth/recover-password', authCtrl.recoverPassword);
router.post('/auth/reset-password', authCtrl.resetPassword);
router.post('/auth/user-verification', authCtrl.userVerification);
router.get('/auth/users/:id', authCtrl.getUserById);

// User
router.get('/admin/users', userCtrl.getUsersPerPage);
router.get('/all/users', userCtrl.getAllUsers);
router.post('/user/create', userCtrl.postCreateUser);
router.put('/user/edit', userCtrl.putUserById);
router.delete('/user/:id', userCtrl.deleteUser);
router.get('/users/role/:roleId', userCtrl.getUsersByRole);

module.exports = router;
