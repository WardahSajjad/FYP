require('dotenv').config();
const mailjet = require('node-mailjet').connect(process.env.API_KEY, process.env.SECRET_KEY);
console.log(mailjet);
