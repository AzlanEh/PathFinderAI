"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export function CombinedNavbar() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  return (
    <div className="flex justify-between items-center relative z-50 px-4 py-4 w-full">
      {/* Logo */}
      <Link href="/" className="rounded-full px-4 py-2 bg-[#e3e3e3] text-[#35425a] font-medium">
        Knowster
      </Link>

      {/* Navigation Menu */}
      <div className="bg-[#e3e3e3] rounded-full px-8 py-2">
        <nav className="flex space-x-6">
          <Link href="/" className="text-[#0a0f18] hover:opacity-75">
            Home
          </Link>
          <Link href="/courses" className="text-[#0a0f18] hover:opacity-75">
            Courses
          </Link>
          <Link href="/resources" className="text-[#0a0f18] hover:opacity-75">
            Resources
          </Link>
        </nav>
      </div>

      {/* Auth Buttons */}
      <div className="flex space-x-2">
        {isLoading ? (
          <div className="h-10 w-24 animate-pulse rounded-full bg-gray-200" />
        ) : isAuthenticated ? (
          <>
            <Link
              href="/dashboard"
              className="rounded-full px-4 py-2 bg-[#e3e3e3] text-[#0a0f18] font-medium hover:bg-opacity-90"
            >
              Dashboard
            </Link>
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-full px-4 py-2 bg-red-600 text-white font-medium hover:bg-red-700"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="rounded-full px-4 py-2 bg-[#e3e3e3] text-[#0a0f18] font-medium hover:bg-opacity-90"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full px-4 py-2 bg-[#e3e3e3] text-[#0a0f18] font-medium hover:bg-opacity-90"
            >
              Join Now
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
