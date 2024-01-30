"use client";

import React, { useState } from 'react'

import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  async function onSignup(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/signup", user);
      console.log("Signup success", response);
      setLoading(false);
      router.push("/login");
    } catch (error) {
      console.error("Signup failed!", error);
      setLoading(false);
    }
  }
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <div className='w-full min-h-svh flex flex-col justify-center items-center'>
        <form
          className='w-11/12 md:w-full max-w-md bg-gradient-to-br from-[#65B0F8] via-[#4C3BA0] to-[#9A61BD] text-white backdrop-blur-xl p-6 md:p-10 rounded-2xl h-max flex flex-col justify-center items-start gap-4 md:gap-6 shadow-lg shadow-black/50 animate-openUp'
          onSubmit={onSignup}
        >
          <h1 className='text-2xl font-semibold text-center w-full'>Create an Account</h1>
          <div className="w-full flex flex-col justify-center items-start gap-0">
            <label className='text-base md:text-lg mt-4' htmlFor="username">Username</label>
            <input
              required
              minLength={6}
              type="text"
              value={user.username}
              onChange={(e) => setUser((prev) => { return { ...prev, username: e.target.value } })}
              placeholder='Username'
              className='w-full px-4 py-2 bg-transparent outline-none border border-white/40 focus:border-white rounded-lg'
            />
            <label className='text-base md:text-lg mt-4' htmlFor="username">Email</label>
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
              minLength={8}
              type="password"
              value={user.password}
              onChange={(e) => setUser((prev) => { return { ...prev, password: e.target.value } })}
              placeholder='Password'
              className='w-full px-4 py-2 bg-transparent outline-none border border-white/40 focus:border-white rounded-lg'
            />
          </div>
          <Link href="/login" className='hover:text-black focus:text-black outline-none'>Already have an account?</Link>
          <button type="submit" className='w-full px-6 py-3 bg-white/30 backdrop-blur-xl hover:text-black focus:text-black rounded-xl outline-none' disabled={loading}>{loading ? "Please wait..." : "Sign Up"}</button>
        </form>
      </div>
    </>
  )
}
