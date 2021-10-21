"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.mail = async function (email, token, html) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  console.log(
    "inside mail function....",
    process.env.EMAIL,
    "process.env.EMAIL",
    process.env.PASSWORD,
    "process.env.PASSWORD"
  );
  var message = `<h2> Welcome to travel info</h2>
   <p> Please click on the link below to verify your account<p>
   <a href='http://localhost:8000/api/v1/users/verify/${token}' > Click to Verify </a>
    `;
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `travel Info 👻 <${process.env.EMAIL}>`, // sender address
    to: `${email}`, // list of receivers
    subject: "travel info", // Subject line
    text: "welcome to travel Info", // plain text body
    html: html ? html : `${message}; `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
