// src/app/register/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
    User,
    ArrowLeft,
    Check,
    X
} from "lucide-react";

export default function Register() {
    const router = useRouter();
    const { register, isAuthenticated, loading: authLoading } = useAuth();

    // Form state
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // UI state
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Redirect if already authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            router.push("/dashboard");
        }
    }, [isAuthenticated, authLoading, router]);

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

    // Validate form - Based on backend authValidator
    const validateForm = () => {
        const newErrors = {};

        // Username validation - matches backend
        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        } else if (formData.username.trim().length < 4 || formData.username.trim().length > 20) {
            newErrors.username = "Username must be between 4 and 20 characters";
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = "Username can contain letters, numbers, and underscores";
        }

        // Email validation - matches backend
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email";
        }

        // Password validation - matches backend strong password requirements
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else {
            const passwordErrors = [];

            if (formData.password.length < 8) {
                passwordErrors.push("at least 8 characters");
            }
            if (!/[a-z]/.test(formData.password)) {
                passwordErrors.push("one lowercase letter");
            }
            if (!/[A-Z]/.test(formData.password)) {
                passwordErrors.push("one uppercase letter");
            }
            if (!/\d/.test(formData.password)) {
                passwordErrors.push("one number");
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
                passwordErrors.push("one symbol");
            }

            if (passwordErrors.length > 0) {
                newErrors.password = `Password must contain ${passwordErrors.join(", ")}`;
            }
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
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
            const result = await register({
                username: formData.username.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
            });

            if (result.success) {
                setSuccessMessage("Account created successfully! Redirecting to login...");

                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                setGeneralError(result.error || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setGeneralError(
                error.response?.data?.message ||
                "An unexpected error occurred. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Handle Google login
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
    };

    // Password strength checker
    const getPasswordStrength = () => {
        const password = formData.password;
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };

        return checks;
    };

    const passwordChecks = getPasswordStrength();

    if (authLoading) {
        return (
            <main className="h-screen w-full flex items-center justify-center bg-[#FCFAF8]">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-[#D76942] animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Loading...</p>
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
                    Create an Account
                </h1>
                <p className="text-gray-500 text-sm md:text-base">
                    Join our community of readers and writers
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
                        <div>
                            <p className="text-green-800 font-medium text-sm">{successMessage}</p>
                        </div>
                    </div>
                )}

                {/* General Error Message */}
                {generalError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-red-800 font-medium text-sm">Registration Failed</p>
                            <p className="text-red-600 text-sm mt-1">{generalError}</p>
                        </div>
                    </div>
                )}

                {/* Google Login Button */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
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

                {/* Username Field */}
                <div className="flex flex-col gap-1.5 sm:gap-2">
                    <label
                        htmlFor="username"
                        className="text-sm font-medium text-gray-700"
                    >
                        Username
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="elonmusk"
                            disabled={loading}
                            autoComplete="username"
                            className={`w-full border py-2.5 sm:py-3 pl-10 sm:pl-11 pr-4 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#D76942]/20 focus:border-[#D76942] transition-all text-sm sm:text-base disabled:opacity-50 disabled:bg-gray-50 ${errors.username
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                    : "border-gray-300"
                                }`}
                        />
                    </div>
                    {errors.username && (
                        <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            {errors.username}
                        </p>
                    )}
                    {!errors.username && formData.username && (
                        <p className="text-gray-500 text-xs mt-1">
                            4-20 characters, letters, numbers, and underscores only
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5 sm:gap-2 mt-4">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                    >
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
                            disabled={loading}
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
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            disabled={loading}
                            autoComplete="new-password"
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

                {/* Password Requirements */}
                {formData.password && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 font-medium mb-2">Password must contain:</p>
                        <ul className="space-y-1.5">
                            <li className={`text-xs flex items-center gap-2 ${passwordChecks.length ? "text-green-600" : "text-gray-400"
                                }`}>
                                {passwordChecks.length ? (
                                    <Check className="w-3.5 h-3.5" />
                                ) : (
                                    <X className="w-3.5 h-3.5" />
                                )}
                                At least 8 characters
                            </li>
                            <li className={`text-xs flex items-center gap-2 ${passwordChecks.uppercase ? "text-green-600" : "text-gray-400"
                                }`}>
                                {passwordChecks.uppercase ? (
                                    <Check className="w-3.5 h-3.5" />
                                ) : (
                                    <X className="w-3.5 h-3.5" />
                                )}
                                One uppercase letter
                            </li>
                            <li className={`text-xs flex items-center gap-2 ${passwordChecks.lowercase ? "text-green-600" : "text-gray-400"
                                }`}>
                                {passwordChecks.lowercase ? (
                                    <Check className="w-3.5 h-3.5" />
                                ) : (
                                    <X className="w-3.5 h-3.5" />
                                )}
                                One lowercase letter
                            </li>
                            <li className={`text-xs flex items-center gap-2 ${passwordChecks.number ? "text-green-600" : "text-gray-400"
                                }`}>
                                {passwordChecks.number ? (
                                    <Check className="w-3.5 h-3.5" />
                                ) : (
                                    <X className="w-3.5 h-3.5" />
                                )}
                                One number
                            </li>
                            <li className={`text-xs flex items-center gap-2 ${passwordChecks.symbol ? "text-green-600" : "text-gray-400"
                                }`}>
                                {passwordChecks.symbol ? (
                                    <Check className="w-3.5 h-3.5" />
                                ) : (
                                    <X className="w-3.5 h-3.5" />
                                )}
                                One symbol (!@#$%^&*...)
                            </li>
                        </ul>
                    </div>
                )}

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-1.5 sm:gap-2 mt-4">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-gray-700"
                    >
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            disabled={loading}
                            autoComplete="new-password"
                            className={`w-full border py-2.5 sm:py-3 pl-10 sm:pl-11 pr-12 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#D76942]/20 focus:border-[#D76942] transition-all text-sm sm:text-base disabled:opacity-50 disabled:bg-gray-50 ${errors.confirmPassword
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                    : "border-gray-300"
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            tabIndex={-1}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer w-full py-2.5 sm:py-3 px-4 rounded-lg bg-[#D76942] hover:bg-[#c25a35] text-white font-semibold mt-6 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </button>
            </form>

            {/* Login Link */}
            <section className="mt-6 flex items-center gap-2 text-sm sm:text-base">
                <p className="text-gray-600">Already have an account?</p>
                <Link
                    href="/login"
                    className="text-[#D76942] font-semibold hover:underline"
                >
                    Sign in
                </Link>
            </section>

            {/* Terms */}
            <p className="mt-4 text-xs text-gray-400 text-center max-w-[350px]">
                By creating an account, you agree to our{" "}
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