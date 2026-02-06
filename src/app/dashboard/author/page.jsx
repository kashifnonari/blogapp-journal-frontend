// app/dashboard/author/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatsCard from "../../components/StatsCard";
import { postService } from "../../../services/post.service";
import { useAuth } from "../../context/AuthContext";
import {
    FileText,
    Eye,
    MessageSquare,
    Heart,
    ArrowRight,
    Clock,
    CheckCircle,
    AlertCircle,
    Calendar,
    PenTool,
    Edit,
    ExternalLink,
    TrendingUp,
    BookOpen,
    Target,
    MoreVertical,
    Loader2,
    XCircle,
    RefreshCw,
} from "lucide-react";

export default function AuthorDashboard() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        published: 0,
        drafts: 0,
        totalViews: 0,
        pending: 0,
    });

    // Fetch author's posts
    const fetchPosts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await postService.getAllPosts({ author: user?._id || user?.id });
            const postsData = response.posts || response.data || response || [];

            setPosts(postsData);

            // Calculate stats
            const published = postsData.filter((p) => p.status === "published").length;
            const drafts = postsData.filter((p) => p.status === "draft").length;
            const pending = postsData.filter((p) => p.status === "pending").length;
            const totalViews = postsData.reduce((acc, p) => acc + (p.views || 0), 0);

            setStats({ published, drafts, totalViews, pending });
        } catch (err) {
            console.error("Error fetching posts:", err);
            setError(err.response?.data?.message || "Failed to fetch posts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchPosts();
        }
    }, [user]);

    const statsCards = [
        {
            title: "Published",
            value: stats.published.toString(),
            change: "Articles",
            changeType: "neutral",
            icon: FileText,
        },
        {
            title: "Total Views",
            value: stats.totalViews.toLocaleString(),
            change: "All time",
            changeType: "neutral",
            icon: Eye,
            iconColor: "text-blue-600",
            iconBgColor: "bg-blue-100",
        },
        {
            title: "Pending",
            value: stats.pending.toString(),
            change: "Review",
            changeType: "neutral",
            icon: Clock,
            iconColor: "text-yellow-600",
            iconBgColor: "bg-yellow-100",
        },
        {
            title: "Drafts",
            value: stats.drafts.toString(),
            change: "Saved",
            changeType: "neutral",
            icon: BookOpen,
            iconColor: "text-gray-600",
            iconBgColor: "bg-gray-100",
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
                return null;
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

    // Calculate goal progress
    const monthlyGoal = 5;
    const thisMonthPublished = posts.filter((p) => {
        const postDate = new Date(p.createdAt);
        const now = new Date();
        return (
            p.status === "published" &&
            postDate.getMonth() === now.getMonth() &&
            postDate.getFullYear() === now.getFullYear()
        );
    }).length;
    const goalProgress = Math.min((thisMonthPublished / monthlyGoal) * 100, 100);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-[#D76942] animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

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
                        onClick={fetchPosts}
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
                            Author Dashboard
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base mt-1">
                            Welcome back, {user?.name || user?.username || "Author"}!
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={fetchPosts}
                            className="p-2.5 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
                            title="Refresh"
                        >
                            <RefreshCw className="w-4 h-4 text-gray-600" />
                        </button>
                        <Link
                            href="/dashboard/author/new"
                            className="inline-flex items-center justify-center gap-2 bg-[#D76942] hover:bg-[#c25a35] text-white px-4 py-2.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md text-sm sm:text-base flex-1 sm:flex-none"
                        >
                            <PenTool className="w-4 h-4" />
                            Write New Article
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

            {/* Writing Goals Card */}
            <div className="bg-gradient-to-br from-[#D76942] to-[#c25a35] rounded-xl p-4 sm:p-6 text-white">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-11 h-11 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Target className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-sm sm:text-lg">Monthly Writing Goal</h3>
                            <p className="text-white/80 text-xs sm:text-sm">
                                {thisMonthPublished} of {monthlyGoal} articles published
                            </p>
                        </div>
                        <span className="font-bold text-lg sm:text-xl">{Math.round(goalProgress)}%</span>
                    </div>
                    <div className="w-full h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${goalProgress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                {/* My Articles */}
                <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">My Articles</h2>
                        <Link
                            href="/dashboard/author/articles"
                            className="text-xs sm:text-sm text-[#D76942] hover:underline flex items-center gap-1"
                        >
                            View all <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Link>
                    </div>

                    {posts.length === 0 ? (
                        <div className="p-8 text-center">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 mb-2">No articles yet</p>
                            <Link
                                href="/dashboard/author/new"
                                className="inline-flex items-center gap-2 text-[#D76942] hover:underline text-sm"
                            >
                                <PenTool className="w-4 h-4" />
                                Write your first article
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {posts.slice(0, 5).map((article) => (
                                <div
                                    key={article._id || article.id}
                                    className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex flex-col gap-3">
                                        {/* Title Row */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-gray-900 text-sm sm:text-base hover:text-[#D76942] transition-colors line-clamp-2">
                                                    <Link href={`/dashboard/author/articles/${article._id || article.id}`}>
                                                        {article.title}
                                                    </Link>
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <Link
                                                    href={`/dashboard/author/articles/${article._id || article.id}/edit`}
                                                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4 text-gray-500" />
                                                </Link>
                                                {article.status === "published" && article.slug && (
                                                    <Link
                                                        href={`/articles/${article.slug}`}
                                                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
                                                        target="_blank"
                                                    >
                                                        <ExternalLink className="w-4 h-4 text-gray-500" />
                                                    </Link>
                                                )}
                                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer sm:hidden">
                                                    <MoreVertical className="w-4 h-4 text-gray-500" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Meta Row */}
                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                            {getStatusBadge(article.status)}
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(article.createdAt)}
                                            </span>
                                            {article.status === "published" && (
                                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="w-3 h-3" />
                                                        {(article.views || 0).toLocaleString()}
                                                    </span>
                                                    {article.comments !== undefined && (
                                                        <span className="flex items-center gap-1">
                                                            <MessageSquare className="w-3 h-3" />
                                                            {article.comments}
                                                        </span>
                                                    )}
                                                    {article.likes !== undefined && (
                                                        <span className="flex items-center gap-1">
                                                            <Heart className="w-3 h-3" />
                                                            {article.likes}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <Link
                            href="/dashboard/author/new"
                            className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#D76942] hover:bg-[#D76942]/5 transition-all group"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D76942]/10 rounded-full flex items-center justify-center group-hover:bg-[#D76942]/20 transition-colors">
                                <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-[#D76942]" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                                Write Article
                            </span>
                        </Link>
                        <Link
                            href="/dashboard/author/drafts"
                            className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#D76942] hover:bg-[#D76942]/5 transition-all group"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                                Drafts ({stats.drafts})
                            </span>
                        </Link>
                        <Link
                            href="/dashboard/author/articles"
                            className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#D76942] hover:bg-[#D76942]/5 transition-all group"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                                All Articles
                            </span>
                        </Link>
                        <Link
                            href="/dashboard/author/analytics"
                            className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#D76942] hover:bg-[#D76942]/5 transition-all group"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                                Analytics
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Tip Card */}
            {stats.published > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-blue-900 text-sm sm:text-base">
                                Keep the momentum going!
                            </h3>
                            <p className="text-blue-700 text-xs sm:text-sm mt-1">
                                You have {stats.published} published article{stats.published !== 1 ? "s" : ""}.
                                {stats.drafts > 0 && ` Complete your ${stats.drafts} draft${stats.drafts !== 1 ? "s" : ""} to grow your readership.`}
                            </p>
                            <Link
                                href="/dashboard/author/new"
                                className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 mt-2 sm:mt-3"
                            >
                                Write new article <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}