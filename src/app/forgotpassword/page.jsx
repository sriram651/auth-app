"use client";

import React, { useState } from 'react'

import Head from 'next/head'
import axios from 'axios';
import showToast from '@/helpers/toast';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    async function generateResetLink(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/api/forgotpassword", { email });
            showToast("Password reset link has been sent, Check your inbox!", 4000, "top-right", "success");
        } catch ({ response: { data: { error } } }) {
            if (error.includes("not found")) {
                showToast("User not found!", 4000, "top-right", "error");
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Head>
                <title>Forgot Password</title>
            </Head>
            <form className='w-full min-h-screen flex flex-col justify-center items-center gap-2' onSubmit={generateResetLink}>
                <h1>Enter your email to generate reset link</h1>
                <label htmlFor="username">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your Email...'
                    className='w-max px-4 py-2 bg-transparent outline-none border border-black dark:border-white rounded-lg'
                />
                <button type="submit" className='w-max px-6 py-2 bg-blue-600 rounded-lg' disabled={loading}>{loading ? "Please wait..." : "Generate Link"}</button>
            </form>
        </>
    )
}
