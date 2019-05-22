"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.mail = async function ( email, token ) {

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.email, // generated ethereal user
      pass: process.env.password // generated ethereal password
    }
  });
  var html = 
  `<h2> welcome to travel info</h2>
   <p> please click on the link below to varify your account<p>
   <a href='https://localhost:8000/api/users/verify/${ token }' > Click to Varify </a>
    `
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `travel Info 👻 <${process.env.email}>`, // sender address
    to: `${ email }`, // list of receivers
    subject: "travel info", // Subject line
    text: "welcome to travel Info", // plain text body
    html: `${html}` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}