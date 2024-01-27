"use client";

import React from 'react'
import { useRouter } from 'next/navigation';

export default function UserProfilePage({params}) {
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center'>
        <h1 className='text-3xl'>UserProfilePage</h1>
        <p className='w-max bg-orange-500 rounded-lg p-4 text-lg'>{params.id}</p>
    </div>
  )
}
