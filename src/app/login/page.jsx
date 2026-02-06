// src/app/login/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import {
    Eye,
    EyeOff,
    Loader2,
    AlertCircle,
    CheckCircle,
    Mail,
    Lock,
    ArrowLeft
} from "lucide-react";

export default function Login() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, isAuthenticated, user, loading: authLoading } = useAuth();

    // Mounted state to prevent hydration mismatch
    const [mounted, setMounted] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // UI state
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Get redirect URL from query params
    const redirectTo = searchParams.get("from");

    // Set mounted on client
    useEffect(() => {
        setMounted(true);
    }, []);

    // Helper function to get dashboard destination based on role
    const getDashboardByRole = (role) => {
        switch (role) {
            case "admin":
                return "/dashboard/admin";
            case "author":
                return "/dashboard/author";
            case "user":
            default:
                return "/dashboard";
        }
    };

    // Redirect if already authenticated
    useEffect(() => {
        if (mounted && !authLoading && isAuthenticated && user) {
            const destination = getDashboardByRole(user?.role);
            console.log("Already authenticated, redirecting to:", destination);
            window.location.href = destination;
        }
    }, [mounted, isAuthenticated, authLoading, user]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }

        if (generalError) {
            setGeneralError("");
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        setGeneralError("");
        setSuccessMessage("");

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const result = await login({
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
            });

            console.log("Login result:", result);

            if (result.success) {
                setSuccessMessage("Login successful! Redirecting...");

                // Get user data from result
                const userData = result.data?.user || result.data;
                console.log("User data:", userData);
                console.log("User role:", userData?.role);

                // Determine destination based on role
                let destination = getDashboardByRole(userData?.role);

                // Use redirectTo if provided
                if (redirectTo) {
                    destination = redirectTo;
                }

                console.log("Final destination:", destination);

                // Use window.location for guaranteed redirect
                setTimeout(() => {
                    window.location.href = destination;
                }, 500);

            } else {
                setGeneralError(result.error || "Login failed. Please try again.");
                setLoading(false);
            }
        } catch (error) {
            console.error("Login error:", error);
            setGeneralError(
                error.response?.data?.message ||
                "An unexpected error occurred. Please try again."
            );
            setLoading(false);
        }
    };

    // Handle Google login
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
    };

    // Prevent hydration mismatch - render nothing until mounted
    if (!mounted) {
        return null;
    }

    // Show loading while checking auth
    if (authLoading) {
        return (
            <main className="h-screen w-full flex items-center justify-center bg-[#FCFAF8]">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-[#D76942] animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Checking authentication...</p>
                </div>
            </main>
        );
    }

    // If already authenticated, show redirecting
    if (isAuthenticated && user) {
        return (
            <main className="h-screen w-full flex items-center justify-center bg-[#FCFAF8]">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-[#D76942] animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Already logged in. Redirecting...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full flex flex-col items-center bg-[#FCFAF8] font-sans py-8 px-4">

            {/* Back to Home */}
            <div className="w-full max-w-[450px] mb-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-[#D76942] transition-colors text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>

            {/* Header */}
            <section className="flex flex-col gap-2 sm:gap-3 text-center">
                <Link href="/" className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#D76942] to-[#c25a35] rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-xl">J</span>
                    </div>
                </Link>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Welcome Back
                </h1>
                <p className="text-gray-500 text-sm md:text-base">
                    Sign in to continue reading
                </p>
            </section>

            {/* Form Card */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[450px] mt-6 border border-gray-200 shadow-sm bg-white p-6 sm:p-8 md:p-10 rounded-xl"
            >
                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-green-800 font-medium text-sm">{successMessage}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Loader2 className="w-4 h-4 text-green-600 animate-spin" />
                                <span className="text-green-600 text-xs">Please wait...</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* General Error Message */}
                {generalError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-red-800 font-medium text-sm">Login Failed</p>
                            <p className="text-red-600 text-sm mt-1">{generalError}</p>
                        </div>
                    </div>
                )}

                {/* Google Login Button */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading || !!successMessage}
                    className="text-sm sm:text-base cursor-pointer flex gap-2 items-center justify-center border border-gray-300 w-full py-2.5 sm:py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FcGoogle className="text-xl" />
                    Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <hr className="flex-1 border-gray-300" />
                    <span className="text-gray-400 text-sm">or</span>
                    <hr className="flex-1 border-gray-300" />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5 sm:gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="musk@gmail.com"
                            disabled={loading || !!successMessage}
                            autoComplete="email"
                            className={`w-full border py-2.5 sm:py-3 pl-10 sm:pl-11 pr-4 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#D76942]/20 focus:border-[#D76942] transition-all text-sm sm:text-base disabled:opacity-50 disabled:bg-gray-50 ${errors.email
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                    : "border-gray-300"
                                }`}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5 sm:gap-2 mt-4">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-xs sm:text-sm text-[#D76942] hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            disabled={loading || !!successMessage}
                            autoComplete="current-password"
                            className={`w-full border py-2.5 sm:py-3 pl-10 sm:pl-11 pr-12 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#D76942]/20 focus:border-[#D76942] transition-all text-sm sm:text-base disabled:opacity-50 disabled:bg-gray-50 ${errors.password
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                    : "border-gray-300"
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            tabIndex={-1}
                            disabled={loading || !!successMessage}
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !!successMessage}
                    className="cursor-pointer w-full py-2.5 sm:py-3 px-4 rounded-lg bg-[#D76942] hover:bg-[#c25a35] text-white font-semibold mt-6 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                    {loading || successMessage ? (
                        <>
                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                            {successMessage ? "Redirecting..." : "Signing in..."}
                        </>
                    ) : (
                        "Sign In"
                    )}
                </button>
            </form>

            {/* Sign Up Link */}
            <section className="mt-6 flex items-center gap-2 text-sm sm:text-base">
                <p className="text-gray-600">Don&apos;t have an account?</p>
                <Link href="/register" className="text-[#D76942] font-semibold hover:underline">
                    Sign up
                </Link>
            </section>

            {/* Terms */}
            <p className="mt-4 text-xs text-gray-400 text-center max-w-[350px]">
                By signing in, you agree to our{" "}
                <Link href="/terms" className="text-[#D76942] hover:underline">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#D76942] hover:underline">
                    Privacy Policy
                </Link>
            </p>
        </main>
    );
}