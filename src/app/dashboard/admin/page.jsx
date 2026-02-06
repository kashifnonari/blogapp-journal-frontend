// app/dashboard/admin/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatsCard from "../../components/StatsCard";
import { postService } from "../../../services/post.service";
import { authService } from "../../../services/auth.service";
import { categoryService } from "../../../services/category.service";
import {
    FileText,
    Users,
    Eye,
    FolderOpen,
    TrendingUp,
    ArrowRight,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Calendar,
    PenTool,
    Trash2,
    Edit,
    MoreVertical,
    Loader2,
    RefreshCw,
} from "lucide-react";

export default function AdminDashboard() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalArticles: 0,
        totalUsers: 0,
        totalViews: 0,
        totalCategories: 0,
    });

    // Fetch all data
    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const [postsRes, usersRes, categoriesRes] = await Promise.all([
                postService.getAllPosts(),
                authService.getAllAuthors(),
                categoryService.getAllCategories(),
            ]);

            setPosts(postsRes.posts || postsRes.data || postsRes || []);
            setUsers(usersRes.users || usersRes.data || usersRes || []);
            setCategories(categoriesRes.categories || categoriesRes.data || categoriesRes || []);

            // Calculate stats
            const postsData = postsRes.posts || postsRes.data || postsRes || [];
            const usersData = usersRes.users || usersRes.data || usersRes || [];
            const categoriesData = categoriesRes.categories || categoriesRes.data || categoriesRes || [];

            setStats({
                totalArticles: postsData.length,
                totalUsers: usersData.length,
                totalViews: postsData.reduce((acc, post) => acc + (post.views || 0), 0),
                totalCategories: categoriesData.length,
            });
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(err.response?.data?.message || "Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const statsCards = [
        {
            title: "Total Articles",
            value: stats.totalArticles.toLocaleString(),
            change: "All time",
            changeType: "neutral",
            icon: FileText,
        },
        {
            title: "Total Users",
            value: stats.totalUsers.toLocaleString(),
            change: "All authors",
            changeType: "neutral",
            icon: Users,
            iconColor: "text-blue-600",
            iconBgColor: "bg-blue-100",
        },
        {
            title: "Total Views",
            value: stats.totalViews.toLocaleString(),
            change: "All time",
            changeType: "neutral",
            icon: Eye,
            iconColor: "text-green-600",
            iconBgColor: "bg-green-100",
        },
        {
            title: "Categories",
            value: stats.totalCategories.toLocaleString(),
            change: "Active",
            changeType: "neutral",
            icon: FolderOpen,
            iconColor: "text-purple-600",
            iconBgColor: "bg-purple-100",
        },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case "published":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 hidden sm:block" />
                        Published
                    </span>
                );
            case "pending":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-yellow-100 text-yellow-700">
                        <Clock className="w-3 h-3 hidden sm:block" />
                        Pending
                    </span>
                );
            case "draft":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-gray-100 text-gray-700">
                        <AlertCircle className="w-3 h-3 hidden sm:block" />
                        Draft
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-gray-100 text-gray-700">
                        {status || "Unknown"}
                    </span>
                );
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Loading State
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-[#D76942] animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
                    <p className="text-gray-500 mb-4">{error}</p>
                    <button
                        onClick={fetchData}
                        className="inline-flex items-center gap-2 bg-[#D76942] hover:bg-[#c25a35] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Page Header */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base mt-1">
                            Welcome back! Here&apos;s what&apos;s happening.
                        </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                        <button
                            onClick={fetchData}
                            className="p-2.5 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
                            title="Refresh"
                        >
                            <RefreshCw className="w-4 h-4 text-gray-600" />
                        </button>
                        <Link
                            href="/dashboard/admin/articles/new"
                            className="inline-flex items-center justify-center gap-2 bg-[#D76942] hover:bg-[#c25a35] text-white px-4 py-2.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md text-sm sm:text-base"
                        >
                            <PenTool className="w-4 h-4" />
                            <span>New Article</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {statsCards.map((stat, index) => (
                    <StatsCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        changeType={stat.changeType}
                        icon={stat.icon}
                        iconColor={stat.iconColor}
                        iconBgColor={stat.iconBgColor}
                    />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                {/* Recent Articles */}
                <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Articles</h2>
                        <Link
                            href="/dashboard/admin/articles"
                            className="text-xs sm:text-sm text-[#D76942] hover:underline flex items-center gap-1"
                        >
                            View all <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Link>
                    </div>

                    {posts.length === 0 ? (
                        <div className="p-8 text-center">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No articles found</p>
                            <Link
                                href="/dashboard/admin/articles/new"
                                className="inline-flex items-center gap-2 text-[#D76942] hover:underline mt-2 text-sm"
                            >
                                <PenTool className="w-4 h-4" />
                                Create your first article
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Mobile Card View */}
                            <div className="divide-y divide-gray-200 sm:hidden">
                                {posts.slice(0, 5).map((article) => (
                                    <div key={article._id || article.id} className="p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-medium text-gray-900 text-sm truncate">
                                                    {article.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {article.author?.name || article.author?.username || "Unknown Author"}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    {getStatusBadge(article.status)}
                                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {formatDate(article.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                            <button className="p-1.5 hover:bg-gray-100 rounded-lg cursor-pointer">
                                                <MoreVertical className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop Table View */}
                            <div className="hidden sm:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 sm:px-6 py-3">
                                                Article
                                            </th>
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 sm:px-6 py-3 hidden md:table-cell">
                                                Author
                                            </th>
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 sm:px-6 py-3">
                                                Status
                                            </th>
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 sm:px-6 py-3 hidden lg:table-cell">
                                                Views
                                            </th>
                                            <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 sm:px-6 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {posts.slice(0, 5).map((article) => (
                                            <tr
                                                key={article._id || article.id}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-4 sm:px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-900 truncate max-w-[200px] lg:max-w-xs text-sm">
                                                            {article.title}
                                                        </p>
                                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {formatDate(article.createdAt)}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 hidden md:table-cell">
                                                    {article.author?.name || article.author?.username || "Unknown"}
                                                </td>
                                                <td className="px-4 sm:px-6 py-4">
                                                    {getStatusBadge(article.status)}
                                                </td>
                                                <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 hidden lg:table-cell">
                                                    {(article.views || 0).toLocaleString()}
                                                </td>
                                                <td className="px-4 sm:px-6 py-4">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Link
                                                            href={`/dashboard/admin/articles/${article._id || article.id}/edit`}
                                                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                                        >
                                                            <Edit className="w-4 h-4 text-gray-500" />
                                                        </Link>
                                                        <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>

                {/* Recent Users */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Authors</h2>
                        <Link
                            href="/dashboard/admin/users"
                            className="text-xs sm:text-sm text-[#D76942] hover:underline flex items-center gap-1"
                        >
                            View all <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Link>
                    </div>

                    {users.length === 0 ? (
                        <div className="p-8 text-center">
                            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No users found</p>
                        </div>
                    ) : (
                        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                            {users.slice(0, 5).map((user) => (
                                <div key={user._id || user.id} className="flex items-center gap-3">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[#D76942] to-[#c25a35] rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-semibold text-xs sm:text-sm">
                                            {(user.name || user.username || "U").charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 truncate text-sm">
                                            {user.name || user.username}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <span
                                        className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium flex-shrink-0 ${user.role === "admin"
                                                ? "bg-purple-100 text-purple-700"
                                                : user.role === "author"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                    <Link
                        href="/dashboard/admin/articles/new"
                        className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#D76942] hover:bg-[#D76942]/5 transition-all group"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D76942]/10 rounded-full flex items-center justify-center group-hover:bg-[#D76942]/20 transition-colors">
                            <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-[#D76942]" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                            New Article
                        </span>
                    </Link>
                    <Link
                        href="/dashboard/admin/users"
                        className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#D76942] hover:bg-[#D76942]/5 transition-all group"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                            Manage Users
                        </span>
                    </Link>
                    <Link
                        href="/dashboard/admin/categories"
                        className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#D76942] hover:bg-[#D76942]/5 transition-all group"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                            Categories
                        </span>
                    </Link>
                    <Link
                        href="/dashboard/admin/analytics"
                        className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#D76942] hover:bg-[#D76942]/5 transition-all group"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                            Analytics
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}