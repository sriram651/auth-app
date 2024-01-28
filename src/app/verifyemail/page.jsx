"use client";

import React, { useEffect, useState } from 'react'

import Link from 'next/link';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmail() {
    const { get } = useSearchParams();
    const [token, setToken] = useState();
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.post("/api/verifyemail", { token })
                setIsVerified(true);
            } catch (error) {
                setError(error.message);
                // console.log(error);
            }
        }

        if (Boolean(token)) {
            verifyEmail();
        }
    }, [token]);

    useEffect(() => {
        const urlToken = get("token");
        if (Boolean(urlToken)) {
            console.log(urlToken);
            setToken(urlToken);
        }
    }, []);
    return (
        <div className='w-full min-h-screen flex flex-col justify-center items-center gap-4'>
            <h1 className='text-3xl font-medium'>Verify Email</h1>

            <h2 className='w-max max-w-full p-2 bg-orange-500 text-black rounded-lg'>{Boolean(token) ? token : "No token"}</h2>

            {isVerified ? (
                <div>
                    <h2>Email verified</h2>
                    <Link href="/login">Proceed to login</Link>
                </div>
            ) : (
                Boolean(error) ? (
                    <div className="bg-red-600 text-2xl p-2 rounded-md">{error}</div>
                ) : null
            )}
        </div>
    )
}
