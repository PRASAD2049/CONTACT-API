const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;

const ContactRouter = require('./Contact/router/ContactRouter');
const UserRouter = require('./Common/router/UserRouter');
const AuthRouter = require('./Authentication/router/AuthRouter');
const { ProtectedRouteMiddleWare } = require('./Authentication/controller/MiddleWares');

dotenv.config();

const { PORT, DB_PASSWORD, DB_USER } = process.env;

const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.kvuqjvu.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dbUrl).then(() => {

}).catch(() => {

})


const app = express();
app.use(cookieParser());
app.use(express.json());


app.use('/api/user', UserRouter);

app.use('/api/auth', AuthRouter);

app.use('/api/contact', ProtectedRouteMiddleWare, ContactRouter);

app.use((req, res) => {

    res.status(404).json({
        message: 'Route not found',
        status: 'failure'
    })

})

const port = PORT || 3001;

app.listen(port, function () {
    console.log(" server is listening to port 3001");
})