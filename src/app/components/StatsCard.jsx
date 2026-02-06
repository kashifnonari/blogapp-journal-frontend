// src/components/StatsCard.jsx
"use client";

import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import Link from "next/link";

export default function StatsCard({
    title,
    value,
    change,
    changeType = "neutral",
    icon: Icon,
    iconColor = "text-[#D76942]",
    iconBgColor = "bg-[#D76942]/10",
    href,
    loading = false,
}) {
    const changeColors = {
        up: "text-green-600 bg-green-50",
        down: "text-red-600 bg-red-50",
        neutral: "text-gray-600 bg-gray-100",
    };

    const changeClass = changeColors[changeType] || changeColors.neutral;

    const cardContent = (
        <>
            <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 ${iconBgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {Icon && <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`} />}
                </div>
                {changeType !== "neutral" && (
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${changeClass}`}>
                        {changeType === "up" ? <TrendingUp className="w-3 h-3 inline mr-1" /> : <TrendingDown className="w-3 h-3 inline mr-1" />}
                        {change}
                    </div>
                )}
            </div>
            <div>
                {loading ? (
                    <Loader2 className="w-6 h-6 text-gray-400 animate-spin mb-2" />
                ) : (
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                        {value}
                    </p>
                )}
                <p className="text-xs sm:text-sm text-gray-500 font-medium">{title}</p>
                {changeType === "neutral" && change && (
                    <p className="text-xs text-gray-400 mt-1">{change}</p>
                )}
            </div>
        </>
    );

    const baseClasses = `
        bg-white rounded-xl border border-gray-200 p-4 sm:p-5 lg:p-6
        transition-all duration-200
        ${href ? "hover:shadow-md hover:border-gray-300 cursor-pointer" : ""}
    `;

    if (href) {
        return (
            <Link href={href} className={baseClasses}>
                {cardContent}
            </Link>
        );
    }

    return <div className={baseClasses}>{cardContent}</div>;
}