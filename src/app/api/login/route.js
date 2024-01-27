import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        // validate the password
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // create the token
        const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN, { expiresIn: "1d" });

        // create a response and set the cookies then return the response
        const response = NextResponse.json({ message: "Login successful",  }, { status: 200 });
        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}