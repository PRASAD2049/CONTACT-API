const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const APP_PASSWORD = process.env.APP_PASSWORD

techDetails = {
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: "prasadpulaparthi123@gmail.com",
        // different from your login password 
        pass: APP_PASSWORD
    }
}

const transporter = nodemailer.createTransport(techDetails);

let emailObject = {
    to: 'prasadpulaparthi123@gmail.com', // Change to your recipient
    from: 'prasadpulaparthi123@gmail.com', // Change to your verified sender
    subject: 'Test Mail',
    text: 'and easy to do anywhere, even with Node.js ', // it si shown to end client when 
    // SMTP server  is not able to parser HTML
    html: '<strong>I am prasad. Sent Test mail</strong>',
}
transporter.sendMail(emailObject).then(() => {
    console.log("Email is sent")
}).catch(err => { console.log(err) });

module.exports = {
    transporter
}