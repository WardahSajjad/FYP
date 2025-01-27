require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../Models/user.js');  // Assuming your user model is named 'User'
// const argon2i = require('argon2-ffi').argon2i;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const secretKey = config.secretKey;
const passwordRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,24})");
const SibApiV3Sdk = require('sib-api-v3-sdk');
// Initialize the client with your API key
let client = SibApiV3Sdk.ApiClient.instance;
let apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
// const mailjet = require('node-mailjet').connect(process.env.API_KEY, process.env.SECRET_KEY);
// console.log(mailjet)
// console.log(process.env.API_KEY, process.env.SECRET_KEY);

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Use your SendGrid API Key here





// app.post('/account/login', 
const login = async (req, res) => {
    try {
        var response = {};
        const { rEmail, rPassword } = req.body; // Changed to rEmail

        // Validate email and password
        if (!rEmail || !passwordRegex.test(rPassword)) {
            return res.status(400).send({ code: 1, msg: "Invalid credentials" });
        }

        // Find user by email
        var user = await User.findOne({ email: rEmail }, 'email password'); // Changed to find only by email

        if (!user) {
            return res.status(401).send({ code: 1, msg: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(rPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ code: 1, msg: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email }, config.secret, { expiresIn: '1h' });


        user.lastAuthentication = Date.now();
        await user.save();

        response.code = 0;
        response.msg = "Login successful";
        response.token = token; // Send the token to the client
        res.send(response);
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).send({ msg: "Internal server error" });
    }
};




// Account Creation Endpoint
// app.post('/account/create', 
const createAccount = async (req, res) => {
    try {
        const { rEmail, rUsername, rPassword } = req.body;

        // Validate email and username
        if (!rEmail || !validator.isEmail(rEmail)) {
            return res.status(400).send({ code: 1, msg: "Invalid email" });
        }
        if (!rUsername || rUsername.length < 3 || rUsername.length > 24) {
            return res.status(400).send({ code: 1, msg: "Invalid username" });
        }
        if (!passwordRegex.test(rPassword)) {
            // Providing specific feedback on password requirements
            return res.status(400).send({
                code: 3,
                msg: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number."
            });
        }

        // Check if email or username already exists
        const existingUser = await User.findOne({ $or: [{ email: rEmail }, { username: rUsername }] });
        if (existingUser) {
            return res.status(409).send({ code: 2, msg: "Email or username already taken" });
        }

        // Generate email verification token
        const emailVerificationToken = crypto.randomBytes(20).toString('hex');

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(rPassword, 10);
        const newUser = new User({
            email: rEmail,
            username: rUsername,
            password: hashedPassword,
            emailVerificationToken: emailVerificationToken
        });
        await newUser.save();

        // Send verification email using Sendinblue
        const sibApi = new SibApiV3Sdk.TransactionalEmailsApi();
        const sender = { email: "wardasajjad54@gmail.com", name: "ZenDrive Team" };
        const recipients = [{ email: newUser.email, name: newUser.username }];
        const subject = "Email Verification";
        const htmlContent = `<html><body><strong>Please verify your email by using this token: ${emailVerificationToken}</strong></body></html>`;
        const textContent = `Please verify your email by using this token: ${emailVerificationToken}`;

        sibApi.sendTransacEmail({
            sender,
            to: recipients,
            subject,
            htmlContent,
            textContent
        }).then(data => {
            console.log('Email sent', data);
            res.send({ code: 0, msg: 'Verification email sent', data: { username: newUser.username, email: newUser.email } });
        }).catch(err => {
            console.error('Email Send Error:', err);
            res.status(500).send({ msg: 'Failed to send email', details: err });
        });

    } catch (error) {
        console.error('Account Creation Error:', error);
        res.status(500).send({ msg: "Internal server error" });
    }
};


//email verification
// app.get('/verify-email/:token', 
const emailVerification = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
        return res.status(400).send({ msg: 'Invalid token' });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.send({ msg: 'Email verified successfully' });
};




module.exports = {
    login,
    createAccount,
    emailVerification
}