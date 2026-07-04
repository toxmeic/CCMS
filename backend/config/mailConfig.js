import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testxcms@gmail.com",
    pass: "ymoo wqsg xymw fklw"
  }
});

export default transporter;