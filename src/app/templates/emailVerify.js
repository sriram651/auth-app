export const VERIFY_EMAIL_TEMPLATE = (username, hashedToken) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Auth App Email Verification</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }

                    .container {
                        width: 100%;
                        height: 100%;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }

                    .email {
                        width: 90%;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 24px;
                    }

                    .email-header {
                        background-color: #35b0f7;
                        color: #fff;
                        padding: 20px;
                        text-align: center;
                        border-radius: 16px;
                    }

                    .email-body {
                        padding: 20px;
                    }

                    .email-footer {
                        background-color: #35b0f7;
                        color: #fff;
                        padding: 20px;
                        text-align: center;
                    }

                    h1 {
                        font-weight: 700;
                    }

                    a {
                        background-color: #3330dd;
                        color: white;
                        border-radius: 6px;
                        font-weight: 600;
                        text-decoration: none;
                        padding: 8px 16px;
                    }

                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="email">
                        <div class="email-header">
                            <h1>Auth App - Verify your Email</h1>
                        </div>
                        <div class="email-body">
                            <h3>Dear ${username},</h3>
                            <p>Thank you for signing up with <strong>Auth App</strong>. To activate your account, please verify your email address by clicking on the link below:</p>
                            <p><a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Verify your Email</a> now and get started!</p>
                            <p>If you encounter any issues, feel free to reach out to our support team.</p>
                            <br><br>
                            <h4>Best regards,</h4>
                            <h4>Auth App Team</h4>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    `;
}
