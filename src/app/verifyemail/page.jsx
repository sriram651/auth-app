"use client";

import React, { Suspense, useEffect, useState } from 'react'

import Link from 'next/link';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmail() {

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

    return (
        <div className='w-full min-h-screen flex flex-col justify-center items-center gap-4'>
            <h1 className='text-3xl font-medium'>Verify Email</h1>

            <h2 className='w-max max-w-full p-2 bg-orange-500 text-black rounded-lg'>
                <Suspense
                    fallback={
                        <span>Please wait, loading the token...</span>
                    }
                >
                    <ShowToken token={token} setToken={setToken} />
                </Suspense>
            </h2>

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

function ShowToken({ token, setToken }) {
    const { get } = useSearchParams();
    const urlToken = get("token");

    useEffect(() => {
        if (Boolean(urlToken)) {
            setToken(urlToken);
        }
    }, [urlToken]);
    
    return (
        <>
            {Boolean(token) ? token : "No token"}
        </>
    )
}