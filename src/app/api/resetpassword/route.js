import { NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request) {
    try {
        // Extract the token from the request
        const reqBody = await request.json();
        const { token, newPassword } = reqBody;

        // Find the user that has the specified token and also the token not expired
        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });

        // If the user is not found, return error
        if (!user) {
            return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
        }
        

        // Generate the salt and hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        // Modify the password in DB
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Password reset Successful!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}