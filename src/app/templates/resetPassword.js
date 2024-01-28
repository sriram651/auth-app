export const RESET_PASSWORD_TEMPLATE = (username, hashedToken) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Auth App Password Reset</title>
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
                            <h1>Auth App - Reset your password</h1>
                        </div>
                        <div class="email-body">
                            <h3>Dear ${username},</h3>
                            <p>To reset your Auth App account password, Get started by clicking on the link below:</p>
                            <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">Reset Password</a>
                            <p>Kindly ignore this mail if you haven't requested one.</p>
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