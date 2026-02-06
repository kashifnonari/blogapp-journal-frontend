// src/app/dashboard/layout.jsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    // Handle mounting
    useEffect(() => {
        setMounted(true);
    }, []);

    // Redirect if not authenticated
    useEffect(() => {
        if (mounted && !loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [mounted, loading, isAuthenticated, router]);

    const handleCloseSidebar = useCallback(() => {
        setSidebarOpen(false);
    }, []);

    const handleToggleCollapse = useCallback(() => {
        setSidebarCollapsed((prev) => !prev);
    }, []);

    // Prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-[#FCFAF8] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#D76942] animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    // Don't render if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#FCFAF8] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#D76942] animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FCFAF8]">
            {/* Sidebar */}
            <DashboardSidebar
                userRole={user?.role || "author"}
                userName={user?.name || user?.username || "User"}
                isOpen={sidebarOpen}
                onClose={handleCloseSidebar}
                collapsed={sidebarCollapsed}
                onToggleCollapse={handleToggleCollapse}
            />

            {/* Main Content Wrapper */}
            <div
                className={`transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
                    }`}
            >
                {/* Navbar */}
                <DashboardNavbar
                    user={user}
                    onMenuClick={() => setSidebarOpen(true)}
                />

                {/* Page Content */}
                <main className="pt-16 min-h-screen">
                    <div className="p-4 sm:p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}