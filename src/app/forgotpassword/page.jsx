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
            <div className='w-full min-h-svh flex flex-col justify-center items-center'>
                <form
                    className='w-11/12 md:w-full max-w-md bg-gradient-to-br from-[#65B0F8] via-[#4C3BA0] to-[#9A61BD] text-white backdrop-blur-xl p-6 md:p-10 rounded-2xl h-max flex flex-col justify-center items-start gap-2 md:gap-6 shadow-lg shadow-black/50 animate-openUp'
                    onSubmit={generateResetLink}
                >
                    <div className='w-full'>
                        <h1 className='text-xl font-medium text-center w-full'>Forgot password?</h1>
                        <p className='text-sm md:text-base font-thin text-center w-full'>Enter your email to generate reset link</p>
                    </div>
                    <div className="w-full flex flex-col justify-center items-start gap-0">
                        <label className='text-base md:text-lg mt-1 md:mt-3' htmlFor="email">Email</label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your Email...'
                            className='w-full px-4 py-2 bg-transparent outline-none border border-white/40 focus:border-white rounded-lg'
                        />
                    </div>
                    <button type="submit" className='w-full px-6 py-3 bg-white/30 backdrop-blur-xl hover:text-black focus:text-black rounded-xl outline-none' disabled={loading}>{loading ? "Please wait..." : "Generate Link"}</button>
                </form>
            </div>
        </>
    )
}
