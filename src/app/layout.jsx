// src/app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";  // ✅ Import AuthProvider, not useAuth
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Journal - BlogSphere",
  description: "Stories that inspire, ideas that matter. Discover thoughtful articles on technology, education, and social trends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}