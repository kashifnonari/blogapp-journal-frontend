// src/components/DashboardNavbar.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
    Menu,
    Search,
    Bell,
    ChevronDown,
    User,
    Settings,
    LogOut,
    X,
    FileText,
    BookOpen,
    Moon,
    Sun,
    HelpCircle,
} from "lucide-react";

export default function DashboardNavbar({ onMenuClick, user }) {
    const router = useRouter();
    const { logout } = useAuth();

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const profileDropdownRef = useRef(null);
    const notificationDropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    // Mock notifications - replace with real data
    const notifications = [
        {
            id: 1,
            type: "comment",
            message: "John Doe commented on your article",
            time: "5 min ago",
            read: false,
        },
        {
            id: 2,
            type: "like",
            message: "Your article received 10 new likes",
            time: "1 hour ago",
            read: false,
        },
        {
            id: 3,
            type: "system",
            message: "Welcome to The Journal dashboard!",
            time: "2 hours ago",
            read: true,
        },
    ];

    const unreadCount = notifications.filter((n) => !n.read).length;

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileDropdownRef.current &&
                !profileDropdownRef.current.contains(event.target)
            ) {
                setProfileDropdownOpen(false);
            }
            if (
                notificationDropdownRef.current &&
                !notificationDropdownRef.current.contains(event.target)
            ) {
                setNotificationDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus search input when opened
    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
            setSearchOpen(false);
        }
    };

    // Handle logout
    const handleLogout = async () => {
        setProfileDropdownOpen(false);
        await logout();
    };

    // Get user initials
    const getUserInitials = () => {
        if (user?.username) {
            return user.username.charAt(0).toUpperCase();
        }
        if (user?.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return "U";
    };

    // Get display name
    const getDisplayName = () => {
        return user?.username || user?.email?.split("@")[0] || "User";
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5 text-gray-700" />
                    </button>

                    {/* Search Bar - Desktop */}
                    <div className="hidden sm:block">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles, users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-64 lg:w-80 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D76942]/20 focus:border-[#D76942] transition-all"
                            />
                        </form>
                    </div>

                    {/* Search Button - Mobile */}
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Search"
                    >
                        <Search className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? (
                            <Sun className="w-5 h-5 text-gray-700" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-700" />
                        )}
                    </button>

                    {/* Notifications */}
                    <div className="relative" ref={notificationDropdownRef}>
                        <button
                            onClick={() => {
                                setNotificationDropdownOpen(!notificationDropdownOpen);
                                setProfileDropdownOpen(false);
                            }}
                            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Notifications"
                        >
                            <Bell className="w-5 h-5 text-gray-700" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {notificationDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                                    {unreadCount > 0 && (
                                        <button className="text-xs text-[#D76942] hover:underline">
                                            Mark all as read
                                        </button>
                                    )}
                                </div>

                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 ${!notification.read ? "bg-blue-50/50" : ""
                                                    }`}
                                            >
                                                <p className="text-sm text-gray-800">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {notification.time}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-8 text-center">
                                            <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                            <p className="text-sm text-gray-500">No notifications</p>
                                        </div>
                                    )}
                                </div>

                                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                                    <Link
                                        href="/dashboard/notifications"
                                        className="text-sm text-[#D76942] hover:underline font-medium"
                                        onClick={() => setNotificationDropdownOpen(false)}
                                    >
                                        View all notifications
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileDropdownRef}>
                        <button
                            onClick={() => {
                                setProfileDropdownOpen(!profileDropdownOpen);
                                setNotificationDropdownOpen(false);
                            }}
                            className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {/* Avatar */}
                            <div className="w-8 h-8 bg-gradient-to-br from-[#D76942] to-[#c25a35] rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-semibold text-sm">
                                    {getUserInitials()}
                                </span>
                            </div>

                            {/* Name - Hidden on small screens */}
                            <span className="hidden md:block text-sm font-medium text-gray-700 max-w-24 truncate">
                                {getDisplayName()}
                            </span>

                            <ChevronDown
                                className={`hidden sm:block w-4 h-4 text-gray-500 transition-transform ${profileDropdownOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {/* Profile Dropdown Menu */}
                        {profileDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                                {/* User Info */}
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="font-semibold text-gray-900 truncate">
                                        {getDisplayName()}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                                    <span className="inline-block mt-1 px-2 py-0.5 bg-[#D76942]/10 text-[#D76942] text-xs font-medium rounded-full capitalize">
                                        {user?.role || "user"}
                                    </span>
                                </div>

                                {/* Menu Items */}
                                <div className="py-2">
                                    <Link
                                        href="/dashboard/profile"
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        onClick={() => setProfileDropdownOpen(false)}
                                    >
                                        <User className="w-4 h-4" />
                                        My Profile
                                    </Link>

                                    {(user?.role === "admin" || user?.role === "author") && (
                                        <Link
                                            href="/dashboard/author/articles"
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            onClick={() => setProfileDropdownOpen(false)}
                                        >
                                            <FileText className="w-4 h-4" />
                                            My Articles
                                        </Link>
                                    )}

                                    <Link
                                        href="/dashboard/bookmarks"
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        onClick={() => setProfileDropdownOpen(false)}
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        Bookmarks
                                    </Link>

                                    <Link
                                        href="/dashboard/settings"
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        onClick={() => setProfileDropdownOpen(false)}
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Link>

                                    <Link
                                        href="/help"
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        onClick={() => setProfileDropdownOpen(false)}
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                        Help & Support
                                    </Link>
                                </div>

                                {/* Logout */}
                                <div className="py-2 border-t border-gray-100">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar - Expandable */}
            {searchOpen && (
                <div className="sm:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-4 shadow-lg z-40">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search articles, users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D76942]/20 focus:border-[#D76942]"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    </form>
                </div>
            )}
        </header>
    );
}