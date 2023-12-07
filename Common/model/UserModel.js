const mongoose = require('mongoose');

const UserSchemaRules = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        validate: function () {
            return this.password === this.confirmPassword
        }
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date,
        default: Date.now() + (1000*60*5)
    },
    role: {
        type: String,
        default: 'USER'
    }
};

const userSchema = mongoose.Schema(UserSchemaRules);

const UserModel = mongoose.model('userModel', userSchema);

module.exports = UserModel;