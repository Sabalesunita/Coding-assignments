const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, 
  auth: {
    user: "accebc2c00c956", 
    pass: "cc197e7f5a45f7",
  },
});
