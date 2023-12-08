const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fs = require('fs');

dotenv.config();

const { JWT_SECRET } = process.env;

var path = require("path");



let optHtmlPath = path.resolve(__dirname, "../otp.html");

const HtmlTemplateString = fs.readFileSync(optHtmlPath, "utf-8");

const UserModel = require("../../Common/model/UserModel");

const sendEmailHelper = require("../SendEmailHelper");

const promisify = require("util").promisify;

const promisifiedJWTSign = promisify(jwt.sign);


const SignupController = async function (req, res) {

    try {
        const userObj = req.body;

        const newUser = await UserModel.create(userObj);

        res.status(201).json({
            message: 'User Created Successfully',
            response: newUser,
            status: 'success'
        })


    } catch (error) {

        res.status(500).json({
            message: error.message,
            status: 'failure'
        })

    }


};

const LoginContoller = async function (req, res) {

    try {

        let { email, password } = req.body;

        const user = await UserModel.findOne({ email: email });

        if (user) {

            let areEqual = password == user.password;

            if (areEqual) {

                let token = await promisifiedJWTSign({ id: user["_id"] }, JWT_SECRET);

                res.cookie("JWT", token, { maxAge: 90000000, httpOnly: true, path: "/" });

                res.status(200).json({
                    status: 'success',
                    message: 'Login success',
                })


            } else {

                res.status(500).json({
                    message: 'Email / Password is wrong',
                    status: 'failure'
                })

            }

        } else {

            res.status(404).json({
                status: 'failure',
                message:
                    "user not found with creds"
            })

        }

    } catch (error) {

        res.status(500).json({
            message: error.message,
            status: 'failure'
        })
    }


}


const ForgotPasswordController = async function (req, res) {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email: email });
        if (user) {

            const otp = otpGenerator();

            // 1. send the Email -> token
            await sendEmailHelper(otp, HtmlTemplateString, user.name, user.email)
            // 2. save that token in DB 
            user.otp = otp;
            user.otpExpiry = Date.now() + 1000 * 60 * 5;
            // if you update an object -> model
            await user.save();

            res.status(200).json({
                message: "user updated",
                status: "success",
                otp: otp,
                userId: user.id
            })


        } else {

            res.status(404).json({
                status: 'failure',
                message: 'Email Not found'
            })

        }

    } catch (error) {

        res.status(500).json({
            status: 'failure',
            message: error.message
        })

    }

}

const ResetPasswordController = async function (req, res) {
    try {

        const userId = req.params.userId;
        const { password, confirmPassword, otp } = req.body;

        const user = await UserModel.findOne({ id: userId });

        if (user) {

            if (otp && user.otp === otp) {
                let currentTime = Date.now();
                if (currentTime < user.otpExpiry) {

                    user.password = password;

                    user.confirmPassword = confirmPassword;

                    delete user.otp;
                    delete user.otpExpiry

                    await user.save()

                    res.status(200).json({
                        status: 'success',
                        message: 'Password reset is success'
                    })

                } else {

                    res.status(500).json({
                        status: 'success',
                        message: 'OTP is expired'
                    })

                }

            } else {

                res.status(500).json({
                    status: 'failure',
                    message: 'otp is not found or wrong'
                })

            }


        } else {

            res.status(404).json({
                status: 'success',
                message: 'No User exists with user id'
            })

        }



    } catch (error) {

        res.status(500).json({
            message: error.message,
            status: 'failre'
        })

    }
}

const LogoutController = async function(req, res) {

    res.cookie("JWT", '', { maxAge: Date.now(), httpOnly: true, path: "/" });

    res.status(200).json({
        status: "success",
        message: "user logged out "
    })
}

function otpGenerator() {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = {
    SignupController,
    LoginContoller,
    ForgotPasswordController,
    ResetPasswordController,
    LogoutController
}