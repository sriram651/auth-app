"use client";

import React, { useEffect, useState } from 'react'

import Link from 'next/link';
import axios from 'axios';
import showToast from '@/helpers/toast';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const { data } = await axios.request("/api/user");
        setUser(data?.user);
      } catch (err) {
        console.log(err);
      }
    }

    getUserDetails();
  }, []);

  async function onLogout() {
    setLoading(true);
    try {
      await axios.request("/api/logout");
      showToast("You've been logged out successfully!", 3000, "top-right", "success");
      router.push("/login");
    } catch (error) {
      console.log(error);
      showToast("Logout failed!", 3000, "top-right", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center gap-2'>
      <h1>ProfilePage</h1>
      {Boolean(user) ? <h2 className='w-max text-xl font-semibold text-green-500'><Link href={`/profile/${user?._id}`}>Go to {user?.username}&apos;s Profile page</Link></h2> : null}
      <button className='w-max px-6 py-2 bg-red-600 rounded-lg outline-none' disabled={loading} onClick={onLogout}>Logout</button>
    </div>
  )
}
