const path = require("path");
const nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");

const sendEmail = async (email, subject, template, context) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.join(__dirname, "../views"),
        defaultLayout: false,
      },
      viewPath: path.join(__dirname, "../views"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      template,
      context,
    };

    await transporter.sendMail(mailOptions);

    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

module.exports = {
  sendEmail,
};
