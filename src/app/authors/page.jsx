"use client";

import Navbar from "../components/Navbar";
import Link from "next/link";
import { User, BookOpen } from "lucide-react";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AuthorsPage() {

    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await api.get("/users/authors");
                setAuthors(response.data.users);
            } catch (err) {
                console.error("Error loading Authors Page:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen w-full bg-[#FCFAF8] flex items-center justify-center">
                    <p className="text-gray-600 text-lg">Loading authors...</p>
                </main>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen w-full bg-[#FCFAF8] flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Oops! Something went wrong.
                        </h2>
                        <p className="text-gray-600">
                            We're sorry, but we couldn't load the authors page. Please try again later.
                        </p>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen w-full bg-[#FCFAF8]">

                {/* ===== Hero Section ===== */}
                <section className="mt-20 w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20 text-center">

                    <p className="text-[#DB7853] text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-4">
                        Meet the Contributors
                    </p>

                    <h1 className="leading-[1.1] sm:leading-[1.15]">
                        <span className="block text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900">
                            The voices behind
                        </span>
                        <span className="block text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#D76942] mt-1 sm:mt-2">
                            The Journal
                        </span>
                    </h1>

                    <p className="mt-6 text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto px-2">
                        Our authors are writers, educators, and professionals who share
                        thoughtful perspectives on ideas that shape the world.
                    </p>

                </section>

                {/* ===== Authors Section ===== */}
                <section className="w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-16">

                    {authors.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {authors.map((author) => (
                                <div
                                    key={author._id}
                                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100"
                                >
                                    {/* Author Avatar */}
                                    <div className="flex justify-center mb-4">
                                        {author.profilePic ? (
                                            // Show profile picture if available
                                            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                                                <Image
                                                    src={author.profilePic}
                                                    alt={author.name || "Author"}
                                                    fill
                                                    sizes="80px"
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                        ) : (
                                            // Show "?" if no profile picture
                                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D76942] to-[#DB7853] flex items-center justify-center text-white text-3xl font-bold shadow-md">
                                                ?
                                            </div>
                                        )}
                                    </div>

                                    {/* Author Info */}
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {author.name || "Anonymous"}
                                        </h3>

                                        <p className="text-sm text-gray-500 mb-3">
                                            {author.email}
                                        </p>

                                        {author.bio && (
                                            <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                                {author.bio}
                                            </p>
                                        )}

                                        {/* Article Count */}
                                        <div className="flex items-center justify-center gap-2 text-[#D76942] mt-4">
                                            <BookOpen className="w-4 h-4" />
                                            <span className="text-sm font-semibold">
                                                {author.articlesCount || 0} {author.articlesCount === 1 ? 'Article' : 'Articles'}
                                            </span>
                                        </div>

                                        {/* View Profile Button */}
                                        <Link
                                            href={`/authors/${author._id}`}
                                            className="mt-4 inline-block w-full bg-[#FCFAF8] hover:bg-[#D76942] hover:text-white text-gray-700 font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                                        >
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl bg-white p-10 sm:p-14 md:p-20 text-center shadow-sm">
                            <div className="flex justify-center mb-6">
                                <User className="w-14 h-14 text-[#D76942]" />
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                No authors yet
                            </h2>

                            <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
                                Check back soon to see our contributors.
                            </p>
                        </div>
                    )}

                </section>

                {/* ===== Call to Action ===== */}
                <section className="w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-16 text-center">

                    <div className="bg-white rounded-2xl shadow-md p-8 sm:p-12 md:p-16 border border-gray-200">

                        <div className="flex justify-center mb-5">
                            <BookOpen className="w-10 h-10 text-[#D76942]" />
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                            Want to write for The Journal?
                        </h3>

                        <p className="text-gray-600 max-w-xl mx-auto mb-8 text-sm sm:text-base">
                            If you have insights, stories, or research worth sharing, we'd
                            love to hear from you.
                        </p>

                        <Link
                            href="/write"
                            className="inline-block bg-[#D76942] hover:bg-[#c25a35] active:scale-95 transition-all text-white px-8 py-3.5 rounded-lg font-semibold shadow-sm hover:shadow-md"
                        >
                            Write for Us →
                        </Link>

                    </div>

                </section>

            </main>
        </>
    );
}