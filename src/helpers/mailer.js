import { RESET_PASSWORD_TEMPLATE } from '@/app/templates/resetPassword';
import User from '@/models/userModel';
import { VERIFY_EMAIL_TEMPLATE } from '@/app/templates/emailVerify';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

export async function sendEmail(email, emailType, userId, username) {
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

        const transport = nodemailer.createTransport({
            service: process.env.MAILER_SERVICE,
            host: process.env.MAILER_HOST,
            port: process.env.MAILER_PORT,
            secure: false,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASSWORD,
            }
        });

        const mailOptions = {
            from: "sriram.sf4038@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: emailType === "VERIFY" ? VERIFY_EMAIL_TEMPLATE(username, hashedToken) : RESET_PASSWORD_TEMPLATE(username, hashedToken),
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
    } catch (error) {
        throw new Error(error.message);
    }
}