const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../../Common/model/UserModel");
const promisify = require("util").promisify;

dotenv.config();
const { JWT_SECRET } = process.env;
const promisifiedJWTVerify = promisify(jwt.verify);


const ProtectedRouteMiddleWare = async function (req, res, next) {

    try {

        let jwttoken = req.cookies.JWT;

        console.log('jwttoken 1', jwttoken);

        if (jwttoken) {
            const decryptedToken = await promisifiedJWTVerify(jwttoken, JWT_SECRET);

            if (decryptedToken) {
                let userId = decryptedToken.id;
                // adding the userId to the req object
                req.userId = userId
                next();
            }
        } else {
            res.status(500).json({
                status: 'failure',
                message: 'User is not logged in.'
            })
        }

    } catch (error) {

        res.status(500).status({
            status: 'failure',
            message: error.message
        })

    }


}

const isAdminMiddleWare = async function (req, res, next) {

    try {
        const user = await UserModel.findById(req.userId);

        if (user && user.role === 'ADMIN') {

            next();

        } else {

            res.status(401).json({
                status: "failure",
                "message": "You are not authorized to do this action "
            })

        }


    } catch (error) {

        res.status(500).json({
            message: error.message,
            status: "failure"
        })

    }
}

const isAutherizedMiddleWare = function (allowedRoles) {

    return async function (req, res, next) {

        const id = req.userId;

        const user = await UserModel.findById(id);

        const isAuthorized = allowedRoles.includes(user.role);

        if (isAuthorized) {

            next();


        } else {

            res.status(401).json({
                status: "failure",
                "message": "You are not authorized to do this action "
            })

        }

    }
}

module.exports = {
    ProtectedRouteMiddleWare,
    isAdminMiddleWare,
    isAutherizedMiddleWare
}