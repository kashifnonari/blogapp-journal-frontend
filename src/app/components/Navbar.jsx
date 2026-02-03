"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/articles", label: "Articles" },
        { href: "/categories", label: "Categories" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#D76942] to-[#c25a35] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                            <span className="text-white font-bold text-lg sm:text-xl">J</span>
                        </div>
                        <span className="text-xl sm:text-2xl font-bold text-gray-900">
                            The Journal
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-[#D76942] font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button
                            className="cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5 text-gray-700" />
                        </button>

                        <div className="hidden sm:flex items-center gap-3">
                            <Link
                                href="/login"
                                className="flex items-center gap-2 text-gray-700 hover:text-[#D76942] font-medium transition-colors"
                            >
                                <LogIn className="w-4 h-4" />
                                <span>Login</span>
                            </Link>
                            <Link
                                href="/signup"
                                className="flex items-center gap-2 bg-[#D76942] hover:bg-[#c25a35] text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md"
                            >
                                <UserPlus className="w-4 h-4" />
                                <span>Sign Up</span>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="cursor-pointer md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6 text-gray-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 bg-white">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#D76942] font-medium rounded-lg transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="mx-4 mt-4 space-y-2">
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-[#D76942] text-gray-700 hover:text-[#D76942] px-4 py-3 rounded-lg font-semibold transition-all"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center gap-2 bg-[#D76942] hover:bg-[#c25a35] text-white px-4 py-3 rounded-lg font-semibold transition-all"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}