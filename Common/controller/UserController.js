const { getAllFactory } = require("../../Shared/utility/crudFactory");
const UserModel = require("../model/UserModel");

const GetAllUsersController = getAllFactory(UserModel);

module.exports = {
    GetAllUsersController
}
