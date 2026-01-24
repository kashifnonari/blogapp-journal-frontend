"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

    const [toggled, setToggled] = useState(false);

    return (
        <header className="font-sans fixed top-0 left-0 z-50 w-full bg-[#FBFAF9] border border-black/10 py-4 md:py-2 px-8">
            <nav className="w-full flex justify-between items-center">
                <Link
                    href="/"
                    className="text-2xl font-bold"
                >
                    The Journal
                </Link>
                {/* Hamburder */}
                <Menu
                    size={20}
                    className="cursor-pointer md:hidden"
                    onClick={() => setToggled(!toggled)}
                />

                {/* Desktop Navigation */}

                <ul className="hidden text-center md:flex  justify-center items-center text-sm font-semibold gap-4 text-gray-400">
                    <li className="transition-colors duration-300 hover:text-black/60">
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li className="transition-colors duration-300 hover:text-black/60">
                        <Link href="/articles">
                            Articles
                        </Link>
                    </li>
                    <li className="transition-colors duration-300 hover:text-black/60">
                        <Link href="/categories">
                            Categories
                        </Link>
                    </li>
                    <li className="transition-colors duration-300 hover:text-black/60">
                        <Link href="/about">
                            About
                        </Link>
                    </li>
                </ul>
                <Link
                    href="/register"
                    className="hidden md:block bg-[#DA7854] p-3 px-4 text-sm text-white font-semibold rounded-lg"
                >
                    Sign Up
                </Link>

                {/* Mobile Menu */}
                {
                    toggled &&
                    <div className="md:hidden w-full pl-9 pr-8 pb-10 absolute left-0 top-16 bg-[#FBFAF9] border-b border-b-black/10">
                        <ul className="flex flex-col justify-center items-start text-sm font-semibold gap-4 mb-5">
                            <li className="transition-colors duration-200 hover:text-[#DA7854]">
                                <Link href="/">
                                    Home
                                </Link>
                            </li>
                            <li className="transition-colors duration-200 hover:text-[#DA7854]">
                                <Link href="/articles">
                                    Articles
                                </Link>
                            </li>
                            <li className="transition-colors duration-200 hover:text-[#DA7854]">
                                <Link href="/categories">
                                    Categories
                                </Link>
                            </li>
                            <li className="transition-colors duration-200 hover:text-[#DA7854]">
                                <Link href="/about">
                                    About
                                </Link>
                            </li>
                        </ul>
                        <Link
                            href="/register"
                            className="w-[100%] text-center block bg-[#DA7854] p-3 px-4 text-sm text-white font-semibold rounded-lg"
                        >
                            Sign Up
                        </Link>
                    </div>
                }

            </nav>
        </header>
    );
}