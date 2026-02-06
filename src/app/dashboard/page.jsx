// src/app/dashboard/page.jsx
"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && isAuthenticated && user?.role) {
            // Redirect to role-specific dashboard
            if (user.role === "admin") {
                router.push("/dashboard/admin");
            } else if (user.role === "author") {
                router.push("/dashboard/author");
            }
        }
    }, [user, loading, isAuthenticated, router]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-[#D76942] animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[60vh]">
            {/* Welcome Section */}
            <div className="bg-gradient-to-br from-[#D76942] to-[#c25a35] rounded-xl p-6 sm:p-8 text-white mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    Welcome back, {user?.name || user?.username || "User"}!
                </h1>
                <p className="text-white/90 mb-6">
                    Ready to create amazing content? Let&apos;s get started.
                </p>
                <div className="flex flex-wrap gap-3">
                    {user?.role === "admin" && (
                        <Link
                            href="/dashboard/admin"
                            className="inline-flex items-center gap-2 bg-white text-[#D76942] px-5 py-2.5 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                        >
                            Go to Admin Dashboard
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}
                    {(user?.role === "author" || user?.role === "admin") && (
                        <Link
                            href="/dashboard/author"
                            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
                        >
                            Go to Author Dashboard
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <p className="text-sm text-gray-500 mb-1">Account Type</p>
                    <p className="text-2xl font-bold text-gray-900 capitalize">{user?.role || "User"}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-lg font-semibold text-gray-900 truncate">{user?.email}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <p className="text-2xl font-bold text-green-600">Active</p>
                </div>
            </div>

            {/* Navigation Hint */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
                <p className="text-blue-800 font-medium mb-2">Getting Started</p>
                <p className="text-blue-700 text-sm">
                    Use the sidebar to navigate to different sections of your dashboard.
                    You can manage your content, view analytics, and customize your settings.
                </p>
            </div>
        </div>
    );
}