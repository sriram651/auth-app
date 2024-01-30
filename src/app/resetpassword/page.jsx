"use client";

import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios';
import showToast from '@/helpers/toast';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const urlToken = window.location.search?.split("=")[1];
        if (Boolean(urlToken)) {
            setToken(urlToken);
        }
    }, []);

    async function onResetPassword(e) {
        e.preventDefault();
        try {
            await axios.post("/api/resetpassword", { token: token, newPassword: user.password });
            showToast("Password has been reset successfully!", 4000, "top-right", "success");
            router?.push("/login");
        } catch ({ response: { data: { error } } }) {
            if (error.includes("Invalid URL")) {
                showToast("Access denied, Get reset link to proceed!", 4000, "top-right", "error");
                router.push("/forgotpassword");
            } else {
                showToast("Something went wrong, please try again later!", 4000, "top-right", "error");
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Head>
                <title>Password Reset</title>
            </Head>
            <div className='w-full min-h-svh flex flex-col justify-center items-center'>
                <form
                    className='w-11/12 md:w-full max-w-md bg-gradient-to-br from-[#65B0F8] via-[#4C3BA0] to-[#9A61BD] text-white backdrop-blur-xl p-6 md:p-10 rounded-2xl h-max flex flex-col justify-center items-start gap-4 md:gap-6 shadow-lg shadow-black/50 animate-openUp'
                    onSubmit={onResetPassword}
                >
                    <h1 className='text-2xl font-medium text-center w-full'>Reset your password</h1>
                    <div className="w-full flex flex-col justify-center items-start gap-0">
                        <label className='text-base md:text-lg mt-4' htmlFor="email">Email</label>
                        <input
                            required
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser((prev) => { return { ...prev, email: e.target.value } })}
                            placeholder='example@mail.com'
                            className='w-full px-4 py-2 bg-transparent outline-none border border-white/40 focus:border-white rounded-lg'
                        />
                        <label className='text-base md:text-lg mt-4' htmlFor="password">Password</label>
                        <input
                            required
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser((prev) => { return { ...prev, password: e.target.value } })}
                            placeholder='New Password'
                            className='w-full px-4 py-2 bg-transparent outline-none border border-white/40 focus:border-white rounded-lg'
                        />
                        <label className='text-base md:text-lg mt-4' htmlFor="confirmpassword">Confirm Password</label>
                        <input
                            required
                            type="password"
                            value={user.confirmPassword}
                            onChange={(e) => setUser((prev) => { return { ...prev, confirmPassword: e.target.value } })}
                            placeholder='Confirm Password'
                            className='w-full px-4 py-2 bg-transparent outline-none border border-white/40 focus:border-white rounded-lg'
                        />
                    </div>
                    <Link href="/login">Remember your password? Login now</Link>
                    <button type="submit" className='w-full px-6 py-3 bg-white/30 backdrop-blur-xl hover:text-black focus:text-black rounded-xl outline-none' disabled={loading}>{loading ? "Please wait..." : "Reset"}</button>
                </form>
            </div>
        </>
    )
}
