"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import {
    Heart,
    Target,
    Users,
    Lightbulb,
    BookOpen,
    Award,
    Globe,
    Mail,
    Eye,
    MessageCircle,
    Sparkles
} from "lucide-react";

export default function AboutPage() {

    const stats = [
        { number: "10K+", label: "Readers", icon: Users },
        { number: "500+", label: "Articles", icon: BookOpen },
        { number: "50+", label: "Authors", icon: Award },
        { number: "30+", label: "Categories", icon: Globe },
    ];

    const values = [
        {
            icon: Lightbulb,
            title: "Curiosity",
            description: "We believe in asking questions and exploring new ideas without boundaries."
        },
        {
            icon: Heart,
            title: "Authenticity",
            description: "Every story we share is genuine, honest, and written with care."
        },
        {
            icon: Users,
            title: "Community",
            description: "We're building a space where diverse voices can share and connect."
        },
        {
            icon: Sparkles,
            title: "Quality",
            description: "We prioritize thoughtful, well-researched content over clickbait."
        },
    ];

    const team = [
        {
            name: "Muhammad Kashif",
            role: "Founder & Editor-in-Chief",
            bio: "Former journalist with a passion for storytelling and digital media.",
            initial: "MK"
        },
        {
            name: "Waqas Ali",
            role: "Head of Content",
            bio: "10+ years experience in content strategy and editorial leadership.",
            initial: "WA"
        },
        {
            name: "Muhammad Muneer",
            role: "Community Manager",
            bio: "Dedicated to fostering meaningful connections between readers and writers.",
            initial: "MM"
        },
    ];

    const topics = [
        "Technology",
        "Business",
        "Design",
        "Culture",
        "Science",
        "Education",
        "Lifestyle",
        "Health",
        "Travel",
        "Personal Growth",
        "Productivity",
        "Creativity"
    ];

    return (
        <>
            <Navbar />

            <main className="min-h-screen w-full bg-[#FCFAF8]">

                {/* ===== Hero Section ===== */}
                <section className="mt-16 sm:mt-20 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20 text-center">

                    <p className="text-[#DB7853] text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4">
                        About Us
                    </p>

                    <h1 className="leading-[1.15] sm:leading-[1.1]">
                        <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900">
                            We're on a mission to
                        </span>
                        <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#D76942] mt-1 sm:mt-2">
                            inspire curious minds
                        </span>
                    </h1>

                    <p className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                        The Journal is more than a blog — it's a community of thinkers, dreamers, and storytellers sharing ideas that matter.
                    </p>

                </section>

                {/* ===== Stats Section ===== */}
                <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md p-4 sm:p-6 md:p-8 text-center border border-gray-100 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#D76942] to-[#DB7853] flex items-center justify-center shadow-md">
                                        <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-0.5 sm:mb-1">
                                    {stat.number}
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-sm md:text-base font-medium">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===== Our Story Section ===== */}
                <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">

                        {/* Content */}
                        <div className="order-2 md:order-1">
                            <p className="text-[#DB7853] text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-3 md:mb-4">
                                Our Story
                            </p>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
                                Started with a simple idea
                            </h2>
                            <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                                <p>
                                    The Journal began in 2025 as a small passion project — a place where we could share stories that truly mattered. We noticed that the internet was flooded with content, but quality writing was becoming harder to find.
                                </p>
                                <p>
                                    We wanted to create something different. A space where thoughtful articles could thrive, where readers could discover new perspectives, and where writers could share their expertise without the noise of social media.
                                </p>
                                <p className="hidden sm:block">
                                    Today, we've grown into a community of thousands of curious readers and dozens of talented writers from around the world. But our mission remains the same: to inspire, educate, and connect through the power of storytelling.
                                </p>
                            </div>
                        </div>

                        {/* Quote Card */}
                        <div className="order-1 md:order-2 w-full">
                            <div className="bg-gradient-to-br from-[#D76942] to-[#DB7853] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 text-white shadow-lg sm:shadow-xl">
                                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold">Since 2025</h3>
                                        <p className="text-white/80 text-xs sm:text-sm">Sharing stories that matter</p>
                                    </div>
                                </div>
                                <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed mb-4 sm:mb-5 md:mb-6">
                                    "We believe that great writing has the power to change how people think, feel, and act. That's why we're committed to quality over quantity."
                                </blockquote>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center text-xs sm:text-sm font-bold">
                                        MK
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm sm:text-base">Muhammad Kashif</p>
                                        <p className="text-white/70 text-xs sm:text-sm">Founder</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== Mission & Vision Section ===== */}
                <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">

                        {/* Mission */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md p-5 sm:p-6 md:p-8 lg:p-10 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#D76942] to-[#DB7853] flex items-center justify-center shadow-md">
                                    <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Our Mission</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                To create a platform where thoughtful voices can share meaningful stories, insights, and ideas that educate, inspire, and connect people across the globe.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md p-5 sm:p-6 md:p-8 lg:p-10 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-md">
                                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Our Vision</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                To become the go-to destination for curious minds seeking thoughtful, well-crafted content that brings people together and sparks positive change.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ===== Our Values Section ===== */}
                <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">

                    <div className="text-center mb-8 sm:mb-10 md:mb-12">
                        <p className="text-[#DB7853] text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-3 md:mb-4">
                            What We Believe
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                            These principles guide everything we do, from the content we publish to how we interact with our community.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                        {values.map((value, index) => {
                            const gradients = [
                                "from-[#D76942] to-[#DB7853]",
                                "from-[#ec4899] to-[#f43f5e]",
                                "from-[#6366f1] to-[#8b5cf6]",
                                "from-[#10b981] to-[#14b8a6]",
                            ];
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-sm sm:shadow-md p-5 sm:p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all text-center"
                                >
                                    <div className="flex justify-center mb-3 sm:mb-4">
                                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center shadow-md`}>
                                            <value.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ===== Team Section ===== */}
                <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">

                    <div className="text-center mb-8 sm:mb-10 md:mb-12">
                        <p className="text-[#DB7853] text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-3 md:mb-4">
                            Meet The Team
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                            The People Behind The Journal
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                            A dedicated team passionate about creating meaningful content and building a thriving community.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm sm:shadow-md p-5 sm:p-6 md:p-8 border border-gray-100 hover:shadow-lg transition-shadow text-center"
                            >
                                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#D76942] to-[#DB7853] flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold mx-auto mb-3 sm:mb-4 shadow-lg">
                                    {member.initial}
                                </div>
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-0.5 sm:mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-[#D76942] font-medium text-xs sm:text-sm mb-2 sm:mb-3">
                                    {member.role}
                                </p>
                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===== What We Cover Section ===== */}
                <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
                    <div className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-5 sm:p-8 md:p-12 lg:p-16">
                        <div className="text-center mb-6 sm:mb-8 md:mb-10">
                            <p className="text-[#DB7853] text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-3 md:mb-4">
                                What We Cover
                            </p>
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                                Topics We Explore
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
                                From technology to culture, we cover a wide range of subjects that matter to our readers.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                            {topics.map((topic, index) => (
                                <span
                                    key={index}
                                    className="bg-white/10 hover:bg-white/20 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-default"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== CTA Section ===== */}
                <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
                    <div className="bg-gradient-to-br from-[#D76942] to-[#DB7853] rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 md:p-12 lg:p-16 text-center">

                        <div className="flex justify-center mb-4 sm:mb-5 md:mb-6">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center">
                                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                            </div>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4">
                            Want to Join Us?
                        </h2>

                        <p className="text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 text-xs sm:text-sm md:text-base lg:text-lg">
                            Whether you want to write for us, collaborate, or just say hello — we'd love to hear from you. Let's create something meaningful together.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                            <Link
                                href="/write"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#D76942] hover:bg-gray-50 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95"
                            >
                                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                                Write for Us
                            </Link>
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base transition-all active:scale-95"
                            >
                                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ===== Newsletter Section ===== */}
                <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md p-5 sm:p-8 md:p-12 border border-gray-200 text-center">

                        <div className="flex justify-center mb-3 sm:mb-4 md:mb-5">
                            <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-[#D76942]" />
                        </div>

                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                            Stay Updated
                        </h3>

                        <p className="text-gray-600 max-w-xl mx-auto mb-5 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base">
                            Subscribe to our newsletter and never miss an article. Get the best stories delivered to your inbox.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D76942] focus:border-[#D76942] transition-all text-sm sm:text-base"
                            />
                            <button
                                type="button"
                                className="cursor-pointer bg-[#D76942] hover:bg-[#c25a35] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-95"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </section>

                {/* ===== Footer ===== */}
                <footer className="w-full bg-gray-900 text-gray-300 mt-8 sm:mt-12 md:mt-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
                        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:justify-around mb-8 sm:mb-10 md:mb-12">
                            {/* About */}
                            <div className="text-center md:text-left">
                                <h3 className="text-white font-bold text-base sm:text-lg mb-2 sm:mb-3 md:mb-4">
                                    The Journal
                                </h3>
                                <p className="text-xs sm:text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                                    A curated collection of stories, insights, and ideas for creative minds and curious souls.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div className="text-center md:text-left">
                                <h3 className="text-white font-bold text-base sm:text-lg mb-2 sm:mb-3 md:mb-4">
                                    Quick Links
                                </h3>
                                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                                    <li>
                                        <Link href="/about" className="hover:text-white transition-colors">
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="hover:text-white transition-colors">
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/write" className="hover:text-white transition-colors">
                                            Write for Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/authors" className="hover:text-white transition-colors">
                                            Our Authors
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Categories */}
                            <div className="text-center md:text-left">
                                <h3 className="text-white font-bold text-base sm:text-lg mb-2 sm:mb-3 md:mb-4">
                                    Categories
                                </h3>
                                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                                    <li>
                                        <Link href="/articles" className="hover:text-white transition-colors">
                                            All Articles
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                            <p className="text-xs sm:text-sm text-center sm:text-left">
                                © {new Date().getFullYear()} The Journal. All rights reserved.
                            </p>
                            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
                                <Link href="/privacy" className="hover:text-white transition-colors">
                                    Privacy
                                </Link>
                                <Link href="/terms" className="hover:text-white transition-colors">
                                    Terms
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>

            </main>
        </>
    );
}