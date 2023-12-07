const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const APP_PASSWORD = 'xpig ighd pzjw ohyz';
const SENDER_EMAIL = 'prasadpulaparthi123@gmail.com';


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


async function emailSender(to, subject, html, text) {

    try {
        let emailObject = {
            to: to, // Change to your recipient
            from: SENDER_EMAIL, // Change to your verified sender
            subject: subject,
            text: text, // it si shown to end client when 
            // SMTP server  is not able to parser HTML
            html: html
        }

        await transporter.sendMail(emailObject);

    } catch (error) {

        throw new Error(error.message)

    }

}

async function sendEmailHelper(otp, htmlTemplate, userName, to) {

    const subject = "Reset Password OTP";

    let finalHtmlCode = htmlTemplate.replace('#{OTP}', otp);
    finalHtmlCode = finalHtmlCode.replace('#{USER_NAME}', userName)
    const text = `Hi ${userName}
    Your otp to reset your password is ${otp}`;

    // console.log('abcd');

    await emailSender(to, subject, finalHtmlCode, text);

}

// sendEmailHelper('1234', HtmlTemplateString, 'Prasad', 'prasadpulaparthi123@gmail.com').then(() => {
//     console.log("Email is send")
// }).catch((err) => { console.log(err) });

module.exports = sendEmailHelper;

