"use client";

import React, { useState } from 'react'

import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import showToast from '@/helpers/toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  async function onSignup(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/login", user);
      showToast("Logged in successfully!", 3000, "top-right", "success");
      router?.push("/profile");
    } catch ({ response: { data: { error } } }) {
      if (error.includes("password")) {
        showToast("Invalid password", 3000, "top-right", "error")
      } else if (error.includes("User not found")) {
        showToast("User not found, Register and come back!", 3000, "top-right", "error")
      } else {
        showToast("Something went wrong, please try again later!", 3000, "top-right", "error")
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Head>
        <title>Login | Auth App</title>
      </Head>
      <div className='w-full min-h-svh flex flex-col justify-center items-center'>
        <form
          className='w-11/12 md:w-full max-w-md bg-gradient-to-br from-[#65B0F8] via-[#4C3BA0] to-[#9A61BD] text-white backdrop-blur-xl p-6 md:p-10 rounded-2xl h-max flex flex-col justify-center items-start gap-4 md:gap-8 shadow-lg shadow-black/50'
          onSubmit={onSignup}
          // style={{
          //   background: "linear-gradient(90deg, rgb(249, 115, 22, 0), rgb(249, 115, 22, 0), rgb(157, 23, 77, 0)",
          // }}
        >
          <h1 className='text-2xl font-semibold text-center w-full'>Login</h1>
          <div className="w-full flex flex-col justify-center items-start gap-0">
            <label className='text-base md:text-lg mt-4' htmlFor="email">Email</label>
            <input
              type="text"
              value={user.email}
              onChange={(e) => setUser((prev) => { return { ...prev, email: e.target.value } })}
              placeholder='Email Id'
              className='w-full px-4 py-2 bg-transparent outline-none border border-white/40 focus:border-white rounded-lg'
            />
            <label className='text-base md:text-lg mt-4' htmlFor="password">Password</label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser((prev) => { return { ...prev, password: e.target.value } })}
              placeholder='Password'
              className='w-full px-4 py-2 bg-transparent outline-none border border-white/40 focus:border-white rounded-lg'
            />
            <div className="mt-4 w-full flex flex-row flex-wrap justify-between items-center gap-2">
              <Link href="/signup" className='hover:text-black focus:text-black outline-none'>Don&apos;t have an account?</Link>
              <Link href="/forgotpassword" className='hover:text-black focus:text-black outline-none'>Forgot password?</Link>
            </div>
          </div>
          <button type="submit" className='w-full px-6 py-3 bg-white/30 backdrop-blur-xl hover:text-black focus:text-black rounded-xl outline-none' disabled={loading}>{loading ? "Please wait..." : "Login"}</button>
        </form>
      </div>
    </>
  )
}
