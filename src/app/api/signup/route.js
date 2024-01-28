import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // Perform request body validation here before anyother method
        // -----------------------------------------------------------

        // Check if user exists
        const user = await User.findOne({ email: email });
        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 })
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create the user with the values, and save it in the mongodb
        const newUser = new User({ email, username, password: hashedPassword });
        const savedUser = await newUser.save();

        // Verify Email
        await sendEmail(email, "VERIFY", savedUser._id);
        
        // Return the success response along with the new user.
        return NextResponse.json({ message: "User added", success: true, user: savedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}