const express = require('express');
const { LoginContoller, ForgotPasswordController, ResetPasswordController, SignupController } = require('../controller/AuthContoller');


const AuthRouter = express.Router();
AuthRouter.post('/signup', SignupController);
AuthRouter.post('/login', LoginContoller);
AuthRouter.patch('/forgotpassword', ForgotPasswordController);
AuthRouter.patch('/resetpassword', ResetPasswordController)

module.exports = AuthRouter;