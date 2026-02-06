// app/components/DashboardSidebar.jsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
    LayoutDashboard,
    FileText,
    Users,
    FolderOpen,
    BarChart3,
    Settings,
    LogOut,
    ChevronLeft,
    X,
    PenTool,
    MessageSquare,
    Bookmark,
    Tag,
    Shield,
    Home,
} from "lucide-react";

export default function DashboardSidebar({
    userRole,
    userName,
    isOpen,
    onClose,
    collapsed,
    onToggleCollapse,
}) {
    const pathname = usePathname();
    const { logout } = useAuth();

    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const adminLinks = [
        { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/dashboard/admin/articles", label: "All Articles", icon: FileText },
        { href: "/dashboard/admin/users", label: "Users", icon: Users },
        { href: "/dashboard/admin/categories", label: "Categories", icon: FolderOpen },
        { href: "/dashboard/admin/tags", label: "Tags", icon: Tag },
        { href: "/dashboard/admin/comments", label: "Comments", icon: MessageSquare },
        { href: "/dashboard/admin/analytics", label: "Analytics", icon: BarChart3 },
        { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
    ];

    const authorLinks = [
        { href: "/dashboard/author", label: "Dashboard", icon: LayoutDashboard },
        { href: "/dashboard/author/articles", label: "My Articles", icon: FileText },
        { href: "/dashboard/author/new", label: "Write Article", icon: PenTool },
        { href: "/dashboard/author/drafts", label: "Drafts", icon: Bookmark },
        { href: "/dashboard/author/comments", label: "Comments", icon: MessageSquare },
        { href: "/dashboard/author/analytics", label: "My Analytics", icon: BarChart3 },
        { href: "/dashboard/author/settings", label: "Settings", icon: Settings },
    ];

    const links = userRole === "admin" ? adminLinks : authorLinks;

    const handleLogout = async () => {
        await logout();
    };

    const sidebarContent = (
        <>
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
                <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                    <div className="w-8 h-8 bg-gradient-to-br from-[#D76942] to-[#c25a35] rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-lg">J</span>
                    </div>
                    {(!collapsed || isOpen) && (
                        <span className="text-xl font-bold text-gray-900">The Journal</span>
                    )}
                </Link>

                <button
                    onClick={onClose}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5 text-gray-700" />
                </button>
            </div>

            {/* User Info */}
            <div className={`p-4 border-b border-gray-200 ${collapsed && !isOpen ? "text-center" : ""}`}>
                <div className={`flex items-center gap-3 ${collapsed && !isOpen ? "justify-center" : ""}`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-[#D76942] to-[#c25a35] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                            {userName.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    {(!collapsed || isOpen) && (
                        <div className="overflow-hidden">
                            <p className="font-semibold text-gray-900 truncate">{userName}</p>
                            <div className="flex items-center gap-1">
                                <Shield className="w-3 h-3 text-[#D76942]" />
                                <span className="text-xs text-[#D76942] font-medium capitalize">{userRole}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    const IconComponent = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${isActive
                                    ? "bg-[#D76942]/10 text-[#D76942]"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                } ${collapsed && !isOpen ? "justify-center" : ""}`}
                            title={collapsed && !isOpen ? link.label : ""}
                        >
                            <IconComponent
                                className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-[#D76942]" : ""}`}
                            />
                            {(!collapsed || isOpen) && <span>{link.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-gray-200 space-y-1">
                <Link
                    href="/"
                    className={`flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors ${collapsed && !isOpen ? "justify-center" : ""
                        }`}
                >
                    <Home className="w-5 h-5" />
                    {(!collapsed || isOpen) && <span>View Site</span>}
                </Link>

                <button
                    onClick={onToggleCollapse}
                    className={`hidden lg:flex w-full items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer ${collapsed ? "justify-center" : ""
                        }`}
                >
                    <ChevronLeft
                        className={`w-5 h-5 transition-transform ${collapsed ? "rotate-180" : ""}`}
                    />
                    {!collapsed && <span className="text-sm">Collapse</span>}
                </button>

                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors cursor-pointer ${collapsed && !isOpen ? "justify-center" : ""
                        }`}
                >
                    <LogOut className="w-5 h-5" />
                    {(!collapsed || isOpen) && <span>Logout</span>}
                </button>
            </div>
        </>
    );

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
            )}

            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {sidebarContent}
            </aside>

            <aside
                className={`hidden lg:flex fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-sm z-40 flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"
                    }`}
            >
                {sidebarContent}
            </aside>
        </>
    );
}