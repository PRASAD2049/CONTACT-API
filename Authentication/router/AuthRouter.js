const express = require('express');
const { LoginContoller, ForgotPasswordController, ResetPasswordController, SignupController, LogoutController } = require('../controller/AuthContoller');


const AuthRouter = express.Router();
AuthRouter.post('/signup', SignupController);
AuthRouter.post('/login', LoginContoller);
AuthRouter.patch('/forgotpassword', ForgotPasswordController);
AuthRouter.patch('/resetpassword', ResetPasswordController)
AuthRouter.get('/logout', LogoutController);

module.exports = AuthRouter;