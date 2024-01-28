import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        await sendEmail(user.email, "RESET", user._id, user.username);

        return NextResponse.json({ message: "Password reset link sent" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}