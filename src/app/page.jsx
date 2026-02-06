"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import { Clock, User, ArrowRight, TrendingUp, BookOpen, Mail, Calendar, Tag } from "lucide-react";

export default function Main() {

  return (
    <>
      <Navbar />

      <main className="min-h-screen w-full bg-[#FCFAF8]">

        {/* Welcome Section */}
        <section className="mt-20 w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20 flex flex-col items-center gap-5 sm:gap-7 md:gap-6">

          <div className="inline-block">
            <p className="text-[#DB7853] text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase">
              Welcome to The Journal
            </p>
          </div>

          <h1 className="text-center leading-[1.1] sm:leading-[1.15]">
            <span className="block text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900">
              Stories that inspire,
            </span>
            <span className="block text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#D76942] mt-1 sm:mt-2">
              ideas that matter
            </span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-center max-w-2xl px-2">
            Discover thoughtful articles on technology, education, and social trends. Written for curious minds.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-4">
            <Link
              href="/articles"
              className="bg-[#D76942] hover:bg-[#c25a35] active:scale-95 transition-all text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base shadow-sm hover:shadow-md text-center"
            >
              Start Reading &rarr;
            </Link>
            <Link
              href="/categories"
              className="bg-white hover:bg-gray-50 active:scale-95 transition-all border-2 border-gray-200 text-gray-800 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base shadow-sm hover:shadow-md text-center"
            >
              Browse Categories
            </Link>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-16">
          <div className="bg-gradient-to-br from-[#D76942] to-[#c25a35] rounded-2xl shadow-xl p-8 sm:p-12 md:p-16 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="inline-block mb-4">
                <Mail className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Join Our Newsletter
              </h2>
              <p className="text-white/90 text-base sm:text-lg mb-8">
                Get the latest articles, insights, and updates delivered straight to your inbox. No spam, unsubscribe anytime.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
      flex-1
      px-5 py-3.5
      rounded-lg
      bg-white/90
      text-gray-900
      placeholder-gray-500
      border border-white/40
      focus:outline-none
      focus:ring-4 focus:ring-white/30
      focus:border-white
      transition-all
    "
                />

                <button
                  type="button"
                  className=" cursor-pointer
      bg-white
      hover:bg-gray-100
      text-[#D76942]
      px-8 py-3.5
      rounded-lg
      font-semibold
      shadow-md
      hover:shadow-lg
      transition-all
      active:scale-95
    "
                >
                  Subscribe
                </button>
              </form>
              <p className="text-white/70 text-xs mt-4">
                We respect your privacy. Read our{" "}
                <Link href="/privacy" className="underline hover:text-white">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-gray-900 text-gray-300 mt-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-16">
            <div className="flex flex-col gap-8 md:flex-row md:justify-around mb-12">
              {/* About */}
              <div>
                <h3 className="text-white font-bold text-lg mb-4">The Journal</h3>
                <p className="text-sm leading-relaxed">
                  A curated collection of stories, insights, and ideas for creative minds and curious souls.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/write" className="hover:text-white transition-colors">Write for Us</Link></li>
                  <li><Link href="/authors" className="hover:text-white transition-colors">Our Authors</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm">
                © {new Date().getFullYear()} The Journal. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}