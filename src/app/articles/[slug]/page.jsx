"use client";

import Navbar from "@/app/components/Navbar";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { BookOpen, Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ArticleDetailPage() {

    const { slug } = useParams();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await api.get(`/posts/single-post/${slug}`);
                setArticle(response.data.post);
            } catch (err) {
                console.error("Error loading article:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };


        if (slug) fetchArticle();
    }, [slug]);

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-[#FCFAF8] flex items-center justify-center">
                    <p className="text-gray-600 text-lg">Loading article...</p>
                </main>
            </>
        );
    }

    if (error || !article) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-[#FCFAF8] flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Article not found
                        </h2>
                        <p className="text-gray-600 mb-6">
                            The article you're looking for doesn't exist or was removed.
                        </p>
                        <Link
                            href="/articles"
                            className="inline-flex items-center gap-2 text-[#D76942] font-semibold hover:underline"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Articles
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen w-full bg-[#FCFAF8]">

                {/* ===== Hero / Header ===== */}
                <section className="mt-20 w-full max-w-4xl mx-auto px-5 sm:px-8 md:px-12 py-12 text-center">

                    <p className="text-[#DB7853] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                        Article
                    </p>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        {article.title}
                    </h1>

                    {/* Meta info */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">

                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{article.author?.name || "Admin"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                                {new Date(article.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        {article.category && (
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                <span>{article.category.name}</span>
                            </div>
                        )}

                    </div>

                </section>

                {/* ===== Content ===== */}
                <section className="w-full max-w-4xl mx-auto px-5 sm:px-8 md:px-12 pb-16">

                    <article className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 md:p-10 prose prose-gray max-w-none">

                        {/* If content is HTML */}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: article.content,
                            }}
                        />

                    </article>

                </section>

                {/* ===== Footer CTA ===== */}
                <section className="w-full max-w-4xl mx-auto px-5 sm:px-8 md:px-12 pb-20 text-center">

                    <div className="bg-gradient-to-br from-[#D76942] to-[#DB7853] rounded-2xl p-8 sm:p-12 text-white shadow-lg">

                        <h3 className="text-2xl font-bold mb-4">
                            Enjoyed this article?
                        </h3>

                        <p className="text-white/90 mb-6 max-w-xl mx-auto">
                            Explore more articles or share your own knowledge with the community.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/articles"
                                className="bg-white text-[#D76942] px-8 py-3 rounded-lg font-semibold shadow hover:shadow-md transition"
                            >
                                Browse Articles
                            </Link>

                            <Link
                                href="/write"
                                className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                            >
                                Start Writing
                            </Link>
                        </div>

                    </div>

                </section>

            </main>
        </>
    );
}
