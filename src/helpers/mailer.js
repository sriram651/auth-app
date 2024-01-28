import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

export async function sendEmail(email, emailType, userId) {
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);


        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASSWORD,
            }
        });

        const mailOptions = {
            from: "admin@authapp.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p><a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email." : "reset your password."}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
    } catch (error) {
        throw new Error(error.message);
    }
}