"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SideNavbar from "../../components/sideNav";
import { CombinedNavbar } from "../../components/combined-navbar";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <CombinedNavbar />
      <div className="flex flex-1">
        <SideNavbar />
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Welcome back, {session?.user?.name || session?.user?.email}!
            </p>
          </div>

          {/* Dashboard cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* My Courses */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
              <p className="mt-2 text-gray-600">
                Continue learning where you left off.
              </p>
              <div className="mt-4">
                <Link
                  href="/dashboard/courses"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  View all courses →
                </Link>
              </div>
            </div>

            {/* Progress */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">My Progress</h2>
              <p className="mt-2 text-gray-600">
                Track your learning journey and achievements.
              </p>
              <div className="mt-4">
                <Link
                  href="/dashboard/progress"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  View progress →
                </Link>
              </div>
            </div>

            {/* Profile */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">My Profile</h2>
              <p className="mt-2 text-gray-600">
                Update your personal information and preferences.
              </p>
              <div className="mt-4">
                <Link
                  href="/dashboard/profile"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Edit profile →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
