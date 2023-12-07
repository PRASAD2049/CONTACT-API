const express = require('express');
const { GetAllUsersController } = require('../controller/UserController');
const { ProtectedRouteMiddleWare, isAdminMiddleWare } = require('../../Authentication/controller/MiddleWares');


const UserRouter = express.Router();

UserRouter.use(ProtectedRouteMiddleWare);

UserRouter.get('', isAdminMiddleWare, GetAllUsersController)




module.exports = UserRouter;