"use client";

import React, { useState } from 'react'

import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const notify = (message) => toast(message, { duration: 2000, position: 'bottom' });

  async function onSignup(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", user);
      notify("Logged in successfully!")
      router?.push("/profile");
    } catch ({ response: { data: { error } } }) {
      if (error.includes("password")) {
        notify("Invalid password");
      } else if (error.includes("User not found")) {
        notify("User not found, Register and come back!");
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
        <title>Login</title>
      </Head>
      <form className='w-full min-h-screen flex flex-col justify-center items-center gap-2' onSubmit={onSignup}>
        <h1>Login</h1>
        <label htmlFor="username">Email</label>
        <input
          type="text"
          value={user.email}
          onChange={(e) => setUser((prev) => { return { ...prev, email: e.target.value } })}
          placeholder='Email Id'
          className='w-max px-4 py-2 bg-transparent outline-none border border-black dark:border-white rounded-lg'
        />
        <label htmlFor="username">Username</label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser((prev) => { return { ...prev, password: e.target.value } })}
          placeholder='Password'
          className='w-max px-4 py-2 bg-transparent outline-none border border-black dark:border-white rounded-lg'
        />
        <div className="flex flex-row justify-center items-center gap-6">
          <Link href="/signup">Don&apos;t have an account?</Link>
          <Link href="/forgotpassword">Forgot password?</Link>
        </div>
        <button type="submit" className='w-max px-6 py-2 bg-blue-600' disabled={loading}>Login</button>
      </form>
    </>
  )
}
