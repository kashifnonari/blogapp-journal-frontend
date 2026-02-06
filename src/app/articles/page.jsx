"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { BookOpen, ArrowRight, Calendar, User, Search, Filter } from "lucide-react";
import api from "@/lib/api";
import { useEffect, useState } from "react";

export default function ArticlesPage() {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await api.get("/posts");
                console.log("Fetched articles:", response.data.docs);
                setArticles(response.data.docs || []);
            } catch (err) {
                console.error("Error loading articles:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    // Helper function to get excerpt
    const getExcerpt = (content, maxLength = 120) => {
        if (!content) return "";
        const plainText = content.replace(/<[^>]*>?/gm, "");
        return plainText.length > maxLength
            ? plainText.substring(0, maxLength) + "..."
            : plainText;
    };

    // Loading State
    if (loading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen w-full bg-[#FCFAF8] flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-[#D76942] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600 text-base sm:text-lg">Loading articles...</p>
                    </div>
                </main>
            </>
        );
    }

    // Error State
    if (error) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen w-full bg-[#FCFAF8] flex items-center justify-center px-4">
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md text-center max-w-md w-full">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                            Oops! Something went wrong.
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base mb-6">
                            We couldn't load the articles. Please try again later.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-[#D76942] hover:bg-[#c25a35] text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all"
                        >
                            Try Again
                        </button>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen w-full bg-[#FCFAF8]">

                {/* ===== Hero Section ===== */}
                <section className="mt-16 sm:mt-20 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20 text-center">

                    <p className="text-[#DB7853] text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4">
                        Knowledge Hub
                    </p>

                    <h1 className="leading-[1.1] sm:leading-tight">
                        <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900">
                            All
                        </span>
                        <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#D76942] mt-1">
                            Articles
                        </span>
                    </h1>

                    <p className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Explore insightful articles written by our community.
                        Learn, grow, and stay inspired.
                    </p>

                    {/* Article Count Badge */}
                    {articles.length > 0 && (
                        <div className="mt-6 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                            <BookOpen className="w-4 h-4 text-[#D76942]" />
                            <span className="text-sm font-medium text-gray-700">
                                {articles.length} {articles.length === 1 ? "Article" : "Articles"}
                            </span>
                        </div>
                    )}

                </section>

                {/* ===== Articles Grid ===== */}
                <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">

                    {articles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">

                            {articles.map((article) => (
                                <Link
                                    key={article._id}
                                    href={`/articles/${article.slug || article._id}`}
                                    className="group"
                                >
                                    <article className="bg-white rounded-xl shadow-sm sm:shadow-md hover:shadow-xl transition-all duration-300 p-5 sm:p-6 border border-gray-100 h-full hover:-translate-y-1 flex flex-col">

                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#D76942] to-[#DB7853] flex items-center justify-center shadow-md">
                                                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                            </div>
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-[#D76942] group-hover:translate-x-1 transition-all" />
                                        </div>

                                        {/* Category Tag (if available) */}
                                        {article.category && (
                                            <div className="mb-2 sm:mb-3">
                                                <span className="inline-block bg-[#FFF5F2] text-[#D76942] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full">
                                                    {article.category.name || "General"}
                                                </span>
                                            </div>
                                        )}

                                        {/* Title */}
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#D76942] transition-colors line-clamp-2">
                                            {article.title}
                                        </h3>

                                        {/* Excerpt */}
                                        {(article.excerpt || article.content) && (
                                            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-grow">
                                                {article.excerpt || getExcerpt(article.content)}
                                            </p>
                                        )}

                                        {/* Meta */}
                                        <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500 pt-3 sm:pt-4 border-t border-gray-100 mt-auto">

                                            <div className="flex items-center gap-1 sm:gap-1.5">
                                                <User className="w-3 h-3 sm:w-4 sm:h-4" />
                                                <span className="truncate max-w-[80px] sm:max-w-none">
                                                    {article.author?.name || "Admin"}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1 sm:gap-1.5">
                                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                                <span>
                                                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric"
                                                    })}
                                                </span>
                                            </div>

                                        </div>

                                    </article>
                                </Link>
                            ))}

                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl bg-white p-8 sm:p-12 md:p-16 text-center shadow-sm">

                            <div className="flex justify-center mb-4 sm:mb-6">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FFF5F2] rounded-full flex items-center justify-center">
                                    <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-[#D76942]" />
                                </div>
                            </div>

                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                                No articles yet
                            </h2>

                            <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm sm:text-base">
                                Articles will appear here once they're published.
                                Be the first to share your thoughts!
                            </p>

                            <Link
                                href="/write"
                                className="inline-flex items-center gap-2 bg-[#D76942] hover:bg-[#c25a35] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all active:scale-95"
                            >
                                Write the first article
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                        </div>
                    )}

                </section>

                {/* ===== CTA Section ===== */}
                {articles.length > 0 && (
                    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
                        <div className="bg-gradient-to-br from-[#D76942] to-[#DB7853] rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 text-center text-white">

                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                                Want to Share Your Knowledge?
                            </h3>

                            <p className="text-white/90 max-w-xl mx-auto mb-6 text-sm sm:text-base">
                                Join our community of writers and share your expertise with thousands of readers.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                                <Link
                                    href="/write"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#D76942] hover:bg-gray-50 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95"
                                >
                                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Start Writing
                                </Link>
                                <Link
                                    href="/categories"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all active:scale-95"
                                >
                                    Browse Categories
                                </Link>
                            </div>

                        </div>
                    </section>
                )}

            </main>

            <Footer />
        </>
    );
}