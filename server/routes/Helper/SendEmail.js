const nodemailer = require("nodemailer");
const config = require("config");

async function sendEmail({
  to,
  subject,
  html,
}) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: config.get("USER"),
      pass: config.get("PASS"),
    }});
  await transporter.sendMail({to, subject, html });
}

exports.sendEmail = sendEmail;