const authRouter = require('express').Router();

const AuthController = require('../controllers/AuthController');

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);

module.exports = authRouter;