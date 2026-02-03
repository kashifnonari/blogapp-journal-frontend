"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { PenLine, FileText, Users, Mail, ArrowRight } from "lucide-react";

export default function WriteForUs() {
    return (
        <>
            <Navbar />

            <main className="min-h-screen w-full bg-[#FCFAF8]">

                {/* Hero Section */}
                <section className="mt-20 w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-16 flex flex-col items-center text-center gap-6">
                    <p className="text-[#DB7853] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                        Contribute to The Journal
                    </p>

                    <h1 className="leading-tight">
                        <span className="block text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
                            Write for Us
                        </span>
                        <span className="block text-4xl sm:text-5xl md:text-6xl font-bold text-[#D76942] mt-2">
                            Share ideas that matter
                        </span>
                    </h1>

                    <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
                        We’re always looking for thoughtful writers who want to share insights,
                        experiences, and stories with a curious audience.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Link
                            href="#guidelines"
                            className="bg-[#D76942] hover:bg-[#c25a35] text-white px-8 py-3.5 rounded-lg font-semibold transition-all active:scale-95 shadow-sm hover:shadow-md"
                        >
                            Writing Guidelines
                        </Link>
                        <Link
                            href="#submit"
                            className="bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-800 px-8 py-3.5 rounded-lg font-semibold transition-all active:scale-95 shadow-sm hover:shadow-md"
                        >
                            How to Submit
                        </Link>
                    </div>
                </section>

                {/* What You Can Write */}
                <section className="w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <PenLine className="w-6 h-6 text-[#D76942]" />,
                            title: "Original Articles",
                            desc: "Well-researched, original content written in clear and simple language.",
                        },
                        {
                            icon: <FileText className="w-6 h-6 text-[#D76942]" />,
                            title: "Tech & Education",
                            desc: "Topics like web development, programming, AI tools, and learning guides.",
                        },
                        {
                            icon: <Users className="w-6 h-6 text-[#D76942]" />,
                            title: "Community Focused",
                            desc: "Content that helps students, developers, and curious readers grow.",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
                        >
                            <div className="mb-4">{item.icon}</div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Guidelines */}
                <section
                    id="guidelines"
                    className="w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-14"
                >
                    <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                            Writing Guidelines
                        </h2>
                        <ul className="space-y-3 text-gray-600 text-sm sm:text-base">
                            <li>• Content must be 100% original and plagiarism-free</li>
                            <li>• Clear headings, short paragraphs, easy readability</li>
                            <li>• Include examples or code snippets if technical</li>
                            <li>• Ideal length: 800–1000 words</li>
                            <li>• No promotional or spam content</li>
                        </ul>
                    </div>
                </section>

                {/* Submit Section */}
                <section
                    id="submit"
                    className="w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-16"
                >
                    <div className="bg-gradient-to-br from-[#D76942] to-[#c25a35] rounded-2xl p-10 sm:p-14 text-center shadow-xl">
                        <Mail className="w-12 h-12 text-white mx-auto mb-4" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Ready to Submit?
                        </h2>
                        <p className="text-white/90 max-w-xl mx-auto mb-8">
                            Send us your article idea or completed draft. Our editorial team
                            will review it and get back to you.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:email@example.com"
                                className="bg-white text-[#D76942] px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
                            >
                                Submit via Email <ArrowRight className="w-4 h-4" />
                            </a>
                            <Link
                                href="/contact"
                                className="border border-white text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white hover:text-[#D76942] transition"
                            >
                                Contact Editorial Team
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
}
