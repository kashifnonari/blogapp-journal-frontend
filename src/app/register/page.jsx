"use client";

import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc'

export default function Register() {
    return (
        <main className="h-screen w-full flex flex-col items-center bg-[#FCFAF8] font-sans">

            <section className="flex flex-col gap-3 mt-10">
                <h1 className="transition-text text-2xl md:text-3xl font-bold font-sans text-center">Create Account</h1>
                <p className="transition-text text-gray-500 text-xs md:text-sm tracking-widest text-center">
                    Join our community of readers and writers
                </p>
            </section>

            <form
                className='w-[90%] max-w-[450px] mt-6 border border-gray-200 shadow-sm bg-[#F8F6F2] p-10 rounded-lg'
            >
                {/* With Google */}
                <button
                    type="button"
                    className='text-md md:text-[16px] cursor-pointer flex gap-2 items-center justify-center border border-gray-300 w-full py-[6px] px-2 rounded-lg text-black'
                >
                    <FcGoogle className='text-black' />
                    Continue with Google
                </button>

                <hr className='text-gray-300 mt-4 mb-6' />

                {/* Manually */}

                <section className='flex flex-col gap-2'>
                    <label htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        placeholder='Elon Musk'
                        className='w-full border border-gray-300 w-full py-[6px] px-2 rounded-lg bg-white/70 focus:outline-[#DD6235]'
                    />
                </section>

                <section className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder='musk@gmail.com'
                        className='w-full border border-gray-300 w-full py-[6px] px-2 rounded-lg bg-white/70 focus:outline-[#DD6235]'
                    />
                </section>

                <section className='flex flex-col gap-2 mt-3'>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder='●●●●●●'
                        className='w-full border border-gray-300 w-full py-[6px] px-2 rounded-lg bg-white/70 focus:outline-[#DD6235] placeholder:text-[10px]'
                    />
                </section>

                <button type="submit"
                    className='cursor-pointer w-full border border-gray-300 w-full py-2 px-2 rounded-lg bg-[#DD6235] mt-3 text-white'
                >
                    Create Account
                </button>

            </form>

            <section className='mt-3 text-end flex justify-end flex items-center gap-2'>
                <p> Already have an account? </p>
                <Link
                    href="/login"
                    className='text-[#f54505] hover:border-b border-[#f54505]'
                >
                    Sign in
                </Link>
            </section>

        </main>
    );
};