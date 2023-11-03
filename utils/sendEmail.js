const nodemailer = require("nodemailer");

module.exports = async (email,subject, emailBody) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });



    await transporter.sendMail({
      form: process.env.USER,
      to: email,
      subject: subject,
      html: emailBody,
    });
    console.log("Email send successful to " + email);
  } catch (error) {
    console.log("Email send failed");
    console.log(error);
  }
};
