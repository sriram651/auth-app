"use client";

import React, { useEffect, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios';
import toast from 'react-hot-toast';
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
    const notify = (message) => toast(message, { duration: 2000, position: 'bottom' });

    useEffect(() => {
        const urlToken = window.location.search?.split("=")[1];
        if(Boolean(urlToken)) {
            setToken(urlToken);
        }
    }, []);

    async function onResetPassword(e) {
        e.preventDefault();
        try {
            const response = await axios.post("/api/resetpassword", { token: token, newPassword: user.password });
            notify("Password reset successful!")
            router?.push("/login");
        } catch ({ response: { data: { error } } }) {
            if (error.includes("Invalid URL")) {
                notify("Invalid URL!");
                router.push("/login");
            } else {
                notify("Something went wrong, please try again later!");
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
            <form className='w-full min-h-screen flex flex-col justify-center items-center gap-2' onSubmit={onResetPassword}>
                <h1>Reset your password</h1>
                <label htmlFor="username">Email</label>
                <input
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser((prev) => { return { ...prev, email: e.target.value } })}
                    placeholder='Email Id'
                    className='w-max px-4 py-2 bg-transparent outline-none border border-black dark:border-white rounded-lg'
                />
                <label htmlFor="username">Password</label>
                <input
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser((prev) => { return { ...prev, password: e.target.value } })}
                    placeholder='Password'
                    className='w-max px-4 py-2 bg-transparent outline-none border border-black dark:border-white rounded-lg'
                />
                <label htmlFor="username">Confirm Password</label>
                <input
                    type="password"
                    value={user.confirmPassword}
                    onChange={(e) => setUser((prev) => { return { ...prev, confirmPassword: e.target.value } })}
                    placeholder='Confirm Password'
                    className='w-max px-4 py-2 bg-transparent outline-none border border-black dark:border-white rounded-lg'
                />
                <Link href="/login">Login</Link>
                <button type="submit" className='w-max px-6 py-2 bg-blue-600 rounded-lg' disabled={loading}>{loading ? "Please wait..." : "Reset"}</button>
            </form>
        </>
    )
}