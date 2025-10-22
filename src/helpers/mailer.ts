import { User } from "@/models/userModel";
import nodemailer from "nodemailer"; 

import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  

  try {
    // create hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // save token to database based on emailType
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 60 * 60 * 1000, // 1 hour
        },
        { new: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgetPasswordToken: hashedToken,
          forgetPasswordExpiry: Date.now() + 60 * 60 * 1000,
        },
        { new: true }
      );
    }

    console.log("NODEMAILER_USER:", process.env.NODEMAILER_USER);
    console.log("NODEMAILER_PASS:", process.env.NODEMAILER_PASS);
    console.log("Email to send:", email);

    // create transporter
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    // email options
    const mailOptions = {
      from: '"Your App" <no-reply@yourapp.com>',
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      }, or copy and paste this link in your browser:</p>
      <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
