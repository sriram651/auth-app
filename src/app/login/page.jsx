"use client";

import React, { useState } from 'react'

import Link from 'next/link';

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  async function onSignup(e) {
    e.preventDefault();
  }
  return (
    <form className='w-full min-h-screen flex flex-col justify-center items-center gap-2' onSubmit={onSignup}>
      <h1>Login</h1>
      <label htmlFor="username">Email</label>
      <input
        type="text"
        value={user.email}
        onChange={(e) => setUser((prev) => { return { ...prev, email: e.target.value } })} 
        placeholder='Email Id'
      />
      <label htmlFor="username">Username</label>
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser((prev) => { return { ...prev, password: e.target.value } })} 
        placeholder='Password'
      />
      <Link href="/signup">Don&apos;t have an account?</Link>
      <button type="submit" className='w-max px-6 py-2 bg-blue-600'>Login</button>
    </form>
  )
}
