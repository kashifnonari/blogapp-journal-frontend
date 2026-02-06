// src/context/AuthContext.jsx
"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authService } from "@/services/auth.service";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Ensure we're only running on client
    useEffect(() => {
        setMounted(true);
    }, []);

    // Check if user is logged in on mount
    const checkAuth = useCallback(async () => {
        // Only run on client side
        if (typeof window === 'undefined') {
            setLoading(false);
            return;
        }

        console.log("=== CHECK AUTH CALLED ===");
        try {
            const response = await authService.getCurrentUser();
            console.log("getCurrentUser response:", response);

            const userData = response?.user || response;

            if (userData && (userData.id || userData._id || userData.email)) {
                console.log("✅ User found:", userData);
                setUser(userData);
            } else {
                console.log("❌ No valid user data");
                setUser(null);
            }
        } catch (error) {
            console.log("❌ Auth check error:", error.message);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            checkAuth();
        }
    }, [mounted, checkAuth]);

    // Login function
    const login = async (credentials) => {
        console.log("=== LOGIN CALLED ===");
        try {
            const response = await authService.login(credentials);
            console.log("Login response:", response);

            const userData = response?.user || response;

            if (userData && (userData.id || userData._id || userData.email)) {
                console.log("✅ Login successful, setting user:", userData);
                setUser(userData);
                return { success: true, data: { user: userData } };
            } else {
                console.log("❌ Invalid login response");
                return { success: false, error: "Invalid response from server" };
            }
        } catch (error) {
            console.error("❌ Login error:", error);
            return {
                success: false,
                error: error.response?.data?.message || "Login failed",
            };
        }
    };

    // Logout function
    const logout = async () => {
        console.log("=== LOGOUT CALLED ===");
        try {
            await authService.logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
            if (typeof window !== 'undefined') {
                window.location.href = "/login";
            }
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            return { success: true, data: response };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Registration failed",
            };
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
        register,
        checkAuth,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isAuthor: user?.role === "author",
    };

    // Prevent hydration mismatch by only rendering after mount
    if (!mounted) {
        return (
            <AuthContext.Provider value={{
                user: null,
                loading: true,
                login: async () => ({ success: false }),
                logout: async () => { },
                register: async () => ({ success: false }),
                checkAuth: async () => { },
                isAuthenticated: false,
                isAdmin: false,
                isAuthor: false
            }}>
                {children}
            </AuthContext.Provider>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// ✅ Named export for the hook
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}