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
      <form className='w-full min-h-screen flex flex-col justify-center items-center gap-2' onSubmit={onSignup}>
        <h1>SignupPage</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser((prev) => { return { ...prev, username: e.target.value } })}
          placeholder='Username'
          className='w-max px-4 py-2 bg-transparent outline-none border border-black dark:border-white rounded-lg'
        />
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
        <Link href="/login">Already have an account?</Link>
        <button type="submit" className='w-max px-6 py-2 bg-blue-600 rounded-lg' disabled={loading}>{loading ? "Please wait..." : "Sign Up"}</button>
      </form>
    </>
  )
}
