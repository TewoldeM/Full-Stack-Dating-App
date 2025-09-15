"use client";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function Navbar() {
  const { signOut, user } = useAuth();
  return (
    <nav className="relative z-50 bg-slate-50  dark:border-gray-900/50 shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <span className="flex gap-1 flex-row items-center justify-center text-2xl sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 dark:from- blue dark:to-green-700 bg-clip-text text-transparent">
              <p className="mb-1 font-bold text-2xl">👩‍💻</p>
              GetMatch
            </span>
          </Link>

          {/* Only show navigation links if user is authenticated */}
          {user && (
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/matches"
                className="text-gray-700 dark:text-gray-700 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Discover
              </Link>
              <Link
                href="/matches/list"
                className="text-gray-700 dark:text-gray-700 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Matches
              </Link>
              <Link
                href="/chat"
                className="text-gray-700 dark:text-gray-700 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-200"
              >
                Messages
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 dark:text-gray-700 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-200"
              >
                Profile
              </Link>
            </div>
          )}

          {user ? (
            <button
              onClick={signOut}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
