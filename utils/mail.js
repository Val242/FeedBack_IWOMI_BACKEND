// utils/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,          
    pass: process.env.GOOGLE_APP_PASSWORD,  
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Feedback Hub" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = sendEmail;
